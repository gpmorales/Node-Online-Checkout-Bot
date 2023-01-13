const puppeeter = require('puppeteer');
// Puppeeter is a Node library which has library to manipulate browsers like Chrome or Chromium
// Puppeeter gives us the ability to MIMIC a user on websites like Chrome
// We can also:
// -Generate screenshots and PDFs of pages

 const product_url = "https://www.nike.com/t/air-force-1-07-mens-shoes-5QFp5Z/CW2288-111";

//Creating a Page -> in the FrontEnd world a PAGE is an instance of a Browser we can interact with
async function givePage(){ //this Function creates a PAGE object using a url & returns it
    const browser = await puppeeter.launch({headless:false, OpenInExistingWindow:true});
    const Page = await browser.newPage(); //instantiates new Browser
    //if headless == true -> you wont see browser pop up
    //otherwise you can see the bot interact w the website
    return Page;
}

async function addToCart(Page){
    await Page.goto(product_url); //Now we can travel to Page instance w specified url
    //This Puppeeter function clicks on a specific element we found from HTML script on website

    await Page.click("label[for='skuAndSize__25634210']"); //Selects Shoe Size
    await Page.waitForSelector("button[class='ncss-btn-primary-dark btn-lg add-to-cart-btn']"); //Waits for pg contents to load
    await Page.$eval("button[class='ncss-btn-primary-dark btn-lg add-to-cart-btn']", elem => elem.click()); //Selects Add to Bag

    await Page.waitForSelector("button[class='ncss-btn-primary-dark btn-lg mr3-sm css-1n4ymyz']"); //Waits for checkout option to load
    await Page.$eval("button[class='ncss-btn-primary-dark btn-lg mr3-sm css-1n4ymyz']", elem => elem.click()); //selects 'CheckOut'
    
}

async function Purchase(){ //Master method that runs everything
    var Page = await givePage(); //This instantiates a new Page object returned from the function above
    await addToCart(Page); //insert Page obj into this function which
    console.log("Checkout complete");
}

Purchase(); //To run function, we must CALL it 
