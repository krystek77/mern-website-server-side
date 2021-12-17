import mongoose from 'mongoose';
import URLSlug from 'mongoose-slug-generator';
mongoose.plugin(URLSlug);

const customerSchema = mongoose.Schema({
  title: { type: String, trim: true, default: '' },
  subtitle: { type: String, trim: true, default: '' },
  image: { type: String, default: '' },
  markdown: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now() },
  slug: { type: String, slug: 'title' },
});
customerSchema.pre('save', function (next) {
  this.slug = this.title.toLowerCase().split(/\s*/).join('-');
  next();
});
const Customer = mongoose.model('Customer', customerSchema);
export default Customer;
