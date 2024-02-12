const mongoose = require('mongoose')
const Posts = require('../model/posts');
const Users = require('../model/users')
mongoose.connect('mongodb://127.0.0.1:27017/Blog')
    .then(() => console.log('Connected to Mongo DB!!'))
    .catch((err) => { console.log('Error! Could not connect to Mongo DB! :(', err) })

const seedPosts = async () => {
    await Posts.deleteMany({})
    const user = await Users.findById('65c461ef1e9b311cc5269265')
    for (let i = 1; i <= 50; i++) {
        let post = new Posts({ title: `New Test Post ${i}`, summary: `Test ${i}`, content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis consequatur, accusamus fugit porro maxime ab velit, aliquid modi, exercitationem corrupti doloribus fuga alias odio eius quas molestiae nemo excepturi! Vitae?', tags: [`Test ${i}`], "status": "published", author: user })
        await post.save()
    }
}


seedPosts()

