export class Post {
  _id: String;
  title: String;
  description: String;
  username: String;
  category: String;
  sold: Boolean ;
  location: { state: String, city: String, zip: String };
  contact: String;
  created_at: Date;
  updated_at: Date;
  imageUrl: String;
}
