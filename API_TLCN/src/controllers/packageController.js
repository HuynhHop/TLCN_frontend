const Package = require('../models/Package');

class PackageController {
  // [POST] /package/create
  async createPackage(req, res) {
    const { registrationDate, expirationDate, isRenewal, packageInfo } = req.body;

    try {
      const newPackage = new Package({ 
        registrationDate, 
        expirationDate, 
        isRenewal, 
        packageInfo 
      });
      await newPackage.save();

      res.status(201).json({
        success: true,
        message: "Package created successfully",
        data: newPackage,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // [GET] /package
  async getAllPackages(req, res) {
    try {
      const packages = await Package.find().populate('packageInfo');
      res.json({
        success: true,
        data: packages,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // [GET] /package/:id
  async getPackageById(req, res) {
    try {
      const packages = await Package.findById(req.params.id).populate('packageInfo');
      if (!packages) {
        return res.status(404).json({ success: false, message: "Package not found" });
      }
      res.json({ success: true, data: packages });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // [PUT] /package/:id
  async updatePackage(req, res) {
    const { registrationDate, expirationDate, isRenewal, packageInfo } = req.body;

    try {
      const updatedPackage = await Package.findByIdAndUpdate(
        req.params.id,
        { registrationDate, expirationDate, isRenewal, packageInfo, updatedAt: Date.now() },
        { new: true }
      ).populate('packageInfo');

      if (!updatedPackage) {
        return res.status(404).json({ success: false, message: "Package not found" });
      }

      res.json({
        success: true,
        message: "Package updated successfully",
        data: updatedPackage,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // [DELETE] /package/:id
  async deletePackage(req, res) {
    try {
      const deletedPackage = await Package.findByIdAndDelete(req.params.id);

      if (!deletedPackage) {
        return res.status(404).json({ success: false, message: "Package not found" });
      }

      res.json({
        success: true,
        message: "Package deleted successfully",
        data: deletedPackage,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = new PackageController();