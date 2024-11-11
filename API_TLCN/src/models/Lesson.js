const mongoose = require("mongoose");
var mongooseDelete = require("mongoose-delete");
const Schema = mongoose.Schema;

const lessonSchema = new Schema(
  {
    title: { type: String, required: true },
    excelFile: { type: String, required: true }, // Đường dẫn file Excel chứa từ vựng và thông tin liên quan
  },
  { timestamps: true }
);

// Add Plugins
lessonSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

module.exports = mongoose.model("Lesson", lessonSchema);
