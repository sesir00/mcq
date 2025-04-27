const db = require('../config/db');

exports.getAllUser = (req, res) => {
    // Set headers to disable caching
    const totalUsersQuery = 'SELECT COUNT(*) AS count FROM form WHERE role = "user"';
    const totalAdminsQuery = 'SELECT COUNT(*) AS count FROM form WHERE role = "admin"';
    const subscribedUsersQuery = 'SELECT COUNT(*) AS count FROM form WHERE subscription = 1';
    const unsubscribedUsersQuery = 'SELECT COUNT(*) AS count FROM form WHERE subscription = 0';

    // Query the database using callbacks instead of promises
    db.query(totalUsersQuery, (err, totalUsersResult) => {
        if (err) {
            console.error('Error fetching total users:', err);
            return res.status(500).json({ error: 'Failed to fetch total users' });
        }

        db.query(totalAdminsQuery, (err, totalAdminsResult) => {
            if (err) {
                console.error('Error fetching total admins:', err);
                return res.status(500).json({ error: 'Failed to fetch total admins' });
            }

            db.query(subscribedUsersQuery, (err, subscribedUsersResult) => {
                if (err) {
                    console.error('Error fetching subscribed users:', err);
                    return res.status(500).json({ error: 'Failed to fetch subscribed users' });
                }

                db.query(unsubscribedUsersQuery, (err, unsubscribedUsersResult) => {
                    if (err) {
                        console.error('Error fetching unsubscribed users:', err);
                        return res.status(500).json({ error: 'Failed to fetch unsubscribed users' });
                    }

                    // Return all data if all queries were successful
                    res.json({
                        totalUsers: totalUsersResult[0].count,
                        totalAdmins: totalAdminsResult[0].count,
                        subscribedUsers: subscribedUsersResult[0].count,
                        unsubscribedUsers: unsubscribedUsersResult[0].count,
                    });
                });
            });
        });
    });
};



exports.getAllUserData=(req,res) => {
  
}