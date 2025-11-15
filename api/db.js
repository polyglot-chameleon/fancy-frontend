import { faker } from "@faker-js/faker";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const client = new MongoClient(process.env.DB_CONN);

async function init() {
  const collection = await connect();
  await collection.deleteMany();

  const articles = [];

  for (let i = 0; i < 600; i++) {
    const title = faker.book.title();
    const slug = faker.helpers.slugify(title);
    const summary = faker.lorem.paragraphs(2);
    let content = faker.lorem.paragraphs({ min: 5, max: 20 }).split("\n");
    content = content.map((paragraph) => ({
      text: paragraph,
      img: faker.image.urlPicsumPhotos(),
    }));
    const tags = faker.lorem.words({ min: 1, max: 5 }).split(" ");
    const datetime = faker.date.anytime();
    const img_url = faker.image.urlPicsumPhotos({ width: 1000 });

    articles.push({
      title,
      slug,
      summary,
      content,
      tags,
      datetime,
      img_url,
    });
  }

  await collection.insertMany(articles);
  client.close();
}

async function connect() {
  await client.connect();
  const database = client.db(process.env.DB_NAME);
  const collection = database.collection(process.env.DB_COLL);
  return collection;
}

export async function getArticles(page = 0, n_docs = 20) {
  const collection = await connect();
  return collection
    .find()
    .skip(page * n_docs)
    .limit((page + 1) * n_docs)
    .toArray();
}

init();
