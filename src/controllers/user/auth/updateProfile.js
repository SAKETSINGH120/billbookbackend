const User = require("../../../models/user");

exports.updateProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const updateData = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Handle image upload if provided
        if (req.files && req.files.image && req.files.image.length > 0) {
            user.profileImage = `${req.files.image[0].destination}/${req.files.image[0].filename}`;
        }

        // Allowed fields for update
        const allowedUpdates = ['name', 'email', 'company', 'address', 'city', 'state', 'pincode', 'referralCode'];
        allowedUpdates.forEach(field => {
            if (updateData[field] !== undefined) {
                user[field] = updateData[field];
            }
        });

        if (user.name && user.email && user.company) {
            user.isNewUser = false;
        }


        await user.save();

        return res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            user
        });

    } catch (error) {
        console.error('Error in updateProfile controller:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

