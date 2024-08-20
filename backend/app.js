const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 4000;
const db = require('./db');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Import routes
const adminRoutes = require('./routes/admin');
const adImageRoutes = require('./routes/ad_image');
const allPaymentRoutes = require('./routes/all_payment');
const blockDomainRoutes = require('./routes/block_domain');
const blogRoutes = require('./routes/blog');
const chatRoutes = require('./routes/chat');
const chatUserRoutes = require('./routes/chat_user');
const commentRoutes = require('./routes/comment');
const contactEvRoutes = require('./routes/contact_ev');
const countryRoutes = require('./routes/country');
const eventRoutes = require('./routes/event');
const eventCatRoutes = require('./routes/event_cat');
const searchRoutes = require('./routes/search');
const loginRoutes = require('./routes/login');
const orgRoutes = require('./routes/org');
const eventKeywordsRoutes = require('./routes/event_keywords'); 
const categoryRoutes = require('./routes/categories');
const subscribeRoutes = require('./routes/subscribe');
const organizerRoutes = require('./routes/organizer');
const promoteRoutes = require('./routes/promote');




// Use routes
app.use('/admin', adminRoutes);
app.use('/ad_image', adImageRoutes);
app.use('/all_payment', allPaymentRoutes);
app.use('/block_domain', blockDomainRoutes);
app.use('/blog', blogRoutes);
app.use('/chat', chatRoutes);
app.use('/chat_user', chatUserRoutes);
app.use('/comment', commentRoutes);
app.use('/contact_ev', contactEvRoutes);
app.use('/countries', countryRoutes);
app.use('/event_cat', eventCatRoutes);
app.use('/events', eventRoutes);
app.use('/search', searchRoutes);
app.use('/login', loginRoutes);
app.use('/org', orgRoutes);
app.use('/event_keywords', eventKeywordsRoutes);
app.use('/categories', categoryRoutes);
app.use('/subscribe', subscribeRoutes);
app.use('/organizer', organizerRoutes);
app.use('/promote', promoteRoutes);


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
