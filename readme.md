# Qlik Sense Range Slider

Yes, there's a few range sliders available already. But this one does a few things different.

* Uses a hypercube. This allows you to define a dimension to be selected, and a measure to select the range on independently. For instance, you could make the dimension
SalesPeople and the measure sum(sales), and select a range of sales which will select all the SalesPeople within that range of sales. If you want to use it with just a
field, like Age, just make the dimension Age and the measure only(Age).

* Responds to other selections in the app. The range slider will accurately reflect active selections by display the current minimum and maximum values available in the range.

* Simple code. At just over 100 lines of javascript, including the initial properties and properties panel, it should be pretty easy to read through if you want to customize it.

* Scopes css. A few sliders have used jQuery UI, and loaded the jQuery UI CSS. This one does too, but the jQuery UI CSS is scoped so it doesn't interfere with the rest of the client styles.

This was originally built for the Barcelona Marathon App, which you can check out here - [Qlik Sense Barcelona Marathon](http://webapps.qlik.com/barnamarato/index.html#/?lang=en)

## How to use
### Cube
This extension expects a hypercube of 1 dimension and 1 measure. The dimension is what gets selected, while the measure is what you can use the slider to select on.
### Settings
Min and Max - The min and max values of the range. These are set manually because it's a simple way to make sure the slider is not adversely affected by any selections already
made when the slider object loads.
Step - This is how much the slider will step by.