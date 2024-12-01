const cron = require('node-cron');
const User = require('../models/User'); // Import model User
const Package = require('../models/Package'); // Import model Package

const checkExpiredPackages = () => {
  // Chạy cron mỗi ngày lúc 00:00
  cron.schedule('0 0 * * *', async () => {
    console.log('Running package expiration check...');

    const today = new Date();

    try {
      // Tìm các gói đã hết hạn
      const expiredPackages = await Package.find({ expirationDate: { $lt: today } });

      for (const pkg of expiredPackages) {
        // Tìm user có gói này
        const user = await User.findOne({ package: pkg._id });

        if (user) {
          user.package = null; // Gán package của user về null
          await user.save();
        }

        // Xóa gói đã hết hạn
        await Package.findByIdAndDelete(pkg._id);
      }

      console.log('Package expiration check completed!');
    } catch (error) {
      console.error('Error during package expiration check:', error.message);
    }
  });
};

// const checkExpiredPackages = () => {
//   // Chạy cron mỗi ngày lúc 00:00
//   cron.schedule('0 0 * * *', async () => {
//     console.log('Running package expiration check...');

//     const today = new Date();

//     try {
//       // Tìm các gói đã hết hạn
//       const expiredPackages = await Package.find({ expirationDate: { $lt: today } });

//       for (const pkg of expiredPackages) {
//         // Nếu gói có isRenewal = true, gia hạn thêm
//         if (pkg.isRenewal) {
//           const packageInfo = await PackageInfo.findById(pkg.packageInfo);
//           if (!packageInfo) {
//             console.error(`PackageInfo not found for package ${pkg._id}`);
//             continue;
//           }

//           // Gia hạn thêm thời gian
//           const newExpirationDate = new Date(pkg.expirationDate);
//           newExpirationDate.setDate(newExpirationDate.getDate() + packageInfo.timeDuration);

//           pkg.registrationDate = today; // Đặt lại ngày đăng ký
//           pkg.expirationDate = newExpirationDate;
//           await pkg.save();

//           console.log(`Package ${pkg._id} renewed until ${newExpirationDate}`);
//         } else {
//           // Tìm user có gói này
//           const user = await User.findOne({ package: pkg._id });

//           if (user) {
//             user.package = null; // Gán package của user về null
//             await user.save();
//           }

//           // Xóa gói đã hết hạn
//           await Package.findByIdAndDelete(pkg._id);
//           console.log(`Package ${pkg._id} expired and deleted.`);
//         }
//       }

//       console.log('Package expiration check completed!');
//     } catch (error) {
//       console.error('Error during package expiration check:', error.message);
//     }
//   });
// };


module.exports = checkExpiredPackages;
