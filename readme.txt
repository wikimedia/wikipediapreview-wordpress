=== Wikipedia Preview ===
Contributors: wikimediafoundation
Donate link: https://donate.wikimedia.org/wiki/Ways_to_Give
Tags: wikipedia, facts, popup, card, wiki
Stable tag: 1.15.0
Tested up to: 6.8.1
License: MIT
License URI: https://github.com/wikimedia/wikipedia-preview/blob/main/LICENSE

Wikipedia Preview lets you show a popup card with a short summary from Wikipedia when a reader clicks or hovers over a link.

== Description ==

Enhance your website with free knowledge straight from Wikipedia!

Install Wikipedia Preview, the free add-on designed to better engage your visitors and improve the user experience on your website.

The Wikipedia Preview plugin provides context to your site’s visitors with content directly from Wikipedia. It allows you to add links to your content so that when your visitors click or hover on them, they see a pop-up box with information and images straight from Wikipedia. With Wikipedia Preview your visitors gain context on a topic, without ever leaving your website.

Wikipedia Preview is an official plug-in designed and developed by the [Wikimedia Foundation](https://wikimediafoundation.org/), the non-profit behind Wikipedia and other free knowledge projects.

The plug-in is entirely free to download and use, in line with the Wikimedia Foundation’s mission to provide free knowledge for everyone.

https://youtu.be/_m6YzR0j8Fs

**Benefits**

* Rich-media content straight from Wikipedia, to give your site’s visitors the context they need, without ever having to leave your website.
* Always free.
* Available in 300 languages.
* Easy to set up. Adding Wikipedia Preview links is even easier than adding other hyperlinks.
* Leveraging the content and brand name of one of the most popular websites in the world.

**Features**

* Can be set up using the same process you use to add hyperlinks to your articles or using the Gutenberg editor custom tool.
* Handles any link to a Wikipedia article regardless of language, lead image presence or length.
* Site owners can choose a specific section of an article as a preview, not limited to just the lead section.
* Supports dark mode option for improved readability.
* Works for Right-to-Left (RTL) and Left-To-Right (LTR) languages.
* Offers access to a built-in gallery to dive into article images.
* Can be disabled for any page using the post metadata sidebar.
* Uses Gutenberg editor custom tool to search for Wikipedia articles and visualize Wikipedia Preview for readers.

**How to add preview links to your site**

**Option 1 - How to add Wikipedia Preview links using the Classic Editor:**

* Add a Wikipedia article link to your site’s content using the same process you use to add hyperlinks to your articles.

**Option 2 - How to add Wikipedia Preview links using the Gutenberg/ Block Editor:**

1. Highlight the text you want to link to a Wikipedia article.
2. Select ‘W’ - Wikipedia Preview icon from the menu.
3. You will see a list of suggested articles. Select the one you want to link to.
4. Wikipedia Preview will automatically turn the link into a preview of the relevant Wikipedia article. You can easily customize the preview content by selecting a specific section of the article.

== Installation ==

Setting up the Wikipedia Preview plugin requires two simple steps:

1. Install and activate the plugin on your site for free.
2. Add preview links to your site content to improve the experience for your site visitors.

**INSTALLATION:**

**Option 1 - Install using the automatic plug-in installer:**

1. To add a plugin using the built-in plugin installer:
2. Navigate to Plug-ins > select Add New.
3. Use the search form in the top-right and search Wikipedia Preview.
4. Click the Install Now button to install the plug-in.
5. Once the plug-in installation is complete, click Activate to activate the plugin.

**Option 2 - Upload via Wordpress Admin:**

1. If you have a copy of the plug-in downloaded as a zip file, you can manually upload it and install it through the Plug-ins admin screen.
2. Navigate to Plugins > Add New.
3. Click the Upload Plugin button at the top of the screen.
4. Select the zip file from your local filesystem.
5. Click the Install Now button.
6. When the installation is complete, you’ll see “Plug-in installed successfully.” Click the Activate Plug-in button.

**AFTER ACTIVATION:**

It’s easy to add Wikipedia Preview links to your site. It takes only a few seconds to add a preview link and create a richer experience for your site visitors.

**Option 1 - How to add Wikipedia Preview links using the Classic Editor:**

* Add a Wikipedia article link to your site’s content using the same process you use to add hyperlinks to your articles.

**Option 2 - How to add Wikipedia Preview links using the Gutenberg/ Block Editor:**

1. Highlight the text you want to link to a Wikipedia article.
2. Select ‘W’ - Wikipedia Preview icon from the menu.
3. You will see a list of suggested articles. Select the one you want to link to.
4. Wikipedia Preview will automatically turn the link into a preview of the relevant Wikipedia article.
5. To customize the preview content, choose "Sections" from the toolbar. Select a specific section of the article as the preview content.

**GETTING STARTED:**

Wikipedia Preview gives your site visitors context without leaving your site. We recommend adding links to words, pronouns, or phrases that you think your site visitors might be confused about or want more information about. Some sections of your site may be enhanced by adding a lot of links; other sections of your site might not need any.
Take a few minutes to add links retroactively to your existing content, and take just a few seconds to add links to new content as you create it in the future. Your visitors will thank you!
Let us know what you think about the product as you’re using it – we love to hear from you.

== Screenshots ==

1. Highlight text and select the 'W' icon to add a Wikipedia Preview in the Gutenberg editor
2. Choose the desired Wikipedia article from the search results to create the preview
3. Preview the Wikipedia article and customize the content using the toolbar
4. Choose a specific section of the Wikipedia article to add as a preview
5. Browse through the image gallery in the Wikipedia Preview with full-screen view and navigation options
6. Add Wikipedia preview in the classic editor by inserting Wikipedia article link as usual
7. Wikipedia Preview on a mobile device
8. Browse through full-screen images in Wikipedia Preview on mobile devices

== Frequently Asked Questions ==

= Is Wikipedia Preview free? =

Yes, Wikipedia Preview is free. It has been made available to you by Wikimedia Foundation, the nonprofit that powers Wikipedia with a mission of free knowledge equity.

= Does Wikipedia Preview work on any word? =

Wikipedia Preview works with any word or phrase that has an article on Wikipedia, in any of the available languages. However, Wikipedia articles are typically language specific, meaning that different articles will be available in different languages. Not every article is available in every language, but you control the language of each preview on your site.

= What is the flow for implementing the Wikipedia Preview links in a post? =

When writing articles, decide which words show a Wikipedia popup on a particular post. The process of enabling the Wikipedia popup on a specific word is identical to [adding a hyperlink](https://wordpress.org/support/article/paragraph-block/#insert-hyperlinks).

= After the implementation of Wikipedia Preview will there be any impact on the size of the page? Will it get laggy? =

The words that will have a Wikipedia Preview popup on your site need to be annotated. Those annotations add to the page size but not more than the regular hyperlinks you already use.

= How does one customise the preview style? =

In the admin site, go to “Appearance / customize”, then select the “Additional CSS” option from the left side menu. In the text box, the following CSS should reset the existing term style so you can adjust it to your liking.

~~~
.wmf-wp-with-preview {
    border: 0;
    background-color: unset;
    padding: unset;
}
.wmf-wp-with-preview::after {
    content: '';
}
~~~

= How can I select the language of my preview links? =

You control the language of each preview link on your website when using the Wikipedia Preview search bar. This allows you to select different languages for each of your site’s previews, if you choose, particularly if your audience speaks multiple languages. Since not every Wikipedia article is available in every language, this has the benefit of creating previews for content that is not available in your site’s primary language. For example, if your website is in Swahili, you will likely add previews of Wikipedia articles in Swahili. However, you may find a word or phrase that does not have a Wikipedia article in Swahili, but perhaps has an English article instead. You can add the English preview in that case by using the Wikipedia Preview search bar. Note: Since Wikipedia is an ever-growing and expanding project, you may come back later and find that the missing article is now available in your preferred language.

= Does the Wikipedia Preview plugin affect my website's SEO? =

No, the Wikipedia Preview plugin has zero impact on your website's SEO. It operates on the client side, does not duplicate content, and is implemented with SEO best practices. Your search engine rankings remain unaffected.

= Is it compatible with all the browsers? =

The Wikipedia Preview is compatible with the following browsers: Chrome, Firefox, Opera, Edge (Current and previous version), Safari 5.1+, iOS 6.1+ and Android 4.1+

= How can we share our experience with Wikipedia Preview with you? =

Please leave reviews on our Wikipedia Preview plugin page

= How else can I work with the Wikimedia Foundation? =

If you would like to explore a collaboration opportunity beyond Wikipedia Preview, please contact partnerships@wikimedia.org

= Can I customize which part of a Wikipedia article appears in the preview? =

Yes, site owners have the option to choose a specific section of an article as a preview, rather than being limited to the lead section. This allows for more targeted and relevant previews.

= Does Wikipedia Preview support dark mode?

Yes, Wikipedia Preview supports dark mode for improved readability.