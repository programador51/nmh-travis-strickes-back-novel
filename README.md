# TS + BS5 + SASS

* [Folder structure](#folder_structure)
* [webpack.config.js](#webpack_config)
    * [Libraries](#libraries)
    * [entry](#entry)
    * [output](#output)
    * [resolve](#resolve)
    * [module](#module)
        * [handlebars rules](#hbs_rules)
        * [typescript rules](#ts_rules)
        * [sass and css rules](#sass_css_rules)
    * [plugins](#plugins)
        * [html-webpack-plugin](#html_webpack_plugin)
        * [MiniCSSExtractPlugin](#MiniCSSExtractPlugin)

---

<span id="folder_structure"></span>
## Folder structure

```
TS+BS5+SASS 
|-- data
|   `-- people.json
|-- public
|   |-- index.html
|   |-- index.css
|   |-- index.js
|   |-- footer.html
|   |-- footer.css
|   |-- footer.js
|   `-- etc
|-- templates
|   |-- components
|   |   |-- footer
|   |   |   |-- footer.hbs
|   |   |   `-- footer.scss
|   |   `-- nav
|   |       |-- nav.hbs
|   |       `-- nav.scss
|   |-- general.scss
|   |-- index.scss
|   |-- utilities.scss
|   `-- index.hbs
`-- ts-code
    |-- components
    |   |-- footer.ts
    |   `-- nav.ts
    |-- helpers
    |   `-- dates.ts
    `-- index.ts
```

* **data:** Data in case to render "dynamic info" on the template [handlebars](https://handlebarsjs.com/)
* **public:** CSS, HTML and JS files bundled after transpile (content to upload on hosting)
* **templates:** [Handlebars](https://handlebarsjs.com/) files to work with it. This files will be rendered on the `public` folder ALL in the root of the folder
    * **components:** Partial files to use on the proyect, like footers, menu bars, etc.
    * **general.scss**: Styles that gonna be applied on all `html` pages
    * **index.scss:** SCSS to use on the `index.html`
    * **utilities.scss:** Utilities of styles
    * **index.hbs:** `index.hbs` that will be rendered as `index.html`
* **ts-code:** TS code to work with it on the proyect, the files and folders must match with the `templates` folder

---

<span id="webpack_config"></span>

## Webpack configuration

<span id="libraries"></span>

### Libraries
```javascript
// To render chunks by separetly and render the .hbs to .html
const HtmlWebpackPlugin = require('html-webpack-plugin');

// To generate a css file and inject it on the chunk
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Import json information for the hbs renders
const data = require('./data/people.json');
```

---

* ### entry
<span id="entry"></span>

```javascript

// Must add manually each chunk and set the .ts
// file corresponding

entry:{
    index:'./ts-code/index.ts'
    // footer:'./ts-code/components/footer.ts'
}   
```
---

* ### output
<span id="output"></span>

```javascript
// Bundles will render as the name of chunk
// on the public folder
output:{
    filename:'[name].bundle.js',
    path:`${__dirname}/public`
}
```
---

* ### resolve
<span id="resolve"></span>

```javascript
// The extensions to render will be
// tsx, ts and js
resolve:{
    extensions:[
        '.tsx',
        '.ts',
        '.js'
    ]
}
```

---

* ### module
<span id="module"></span>

#### rules
<span id="rules"></span>

<span id="hbs_rules"></span>

**handlebars**
```javascript
// To transpile .hbs into .html
rules:[
    {
        test:/\.hbs$/,
        loader:'handlebars-loader'
    }
]
```

<span id="ts_rules"></span>

**typescript**
```javascript
// To transpile .ts into .js
rules:[
    {
        test:/\.tsx?$/,
        use:'ts-loader',
        exclude:'/node_modules/'
    }
]
```

<span id="sass_css_rules"></span>

**css and sass**
```javascript
// To transpile .scss into .css and inject it
rules:[
    {
        test: /\.scss$/i,
        use: [
            
            MiniCssExtractPlugin.loader, //3. Inject into chunk file
            
            "css-loader", // 2. Turn css into commonjs code
            
            "sass-loader", // 1. Turns scss into css code
            ]
    }
]
```

---
<span id="plugins"></span>
<span id="html_webpack_plugin"></span>

* ### plugins
    * #### html-webpack-plugin

```javascript
plugins:[
    new HtmlWebpackPlugin({
        // Name of the file rendered
        filename:'index.html',

        // Where to inject the script file generated
        inject:'body',

        // Whick js files to use, just the chunk index
        chunks:['index'],

        // In case of need data, pass the object
        templateParameters:data,

        // Which template engine to transpile
        template:'./templates/index.hbs',
    })
]
```

<span id="MiniCSSExtractPlugin"></span>

#### MiniCSSExtractPlugin
```javascript
plugins:[
    new MiniCssExtractPlugin({
        // Name that will have the css rendered
        filename:`[name].css`,

        // Set which css will be use on 
        //the transpilation, just the chunk one
        chunkFilename: '[name]'
    })
]
```# hbs-template
