# KEP frontend

This README outlines the details of building, running and collaborating on the
frontend side of the Knowledge Exchange Platform (KEP).

For an overview of the application itself, please visit the main README
file, located at the root of the main repository. This is only the `frontend`
submodule.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://www.ember-cli.com/)

```bash
npm install -g bower
npm install -g ember-cli
```

## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `npm install`
* `bower install`

## Running / Development

* for development: `npm start`
  * visit your app at [http://localhost:4200](http://localhost:4200).
  * your api (the Rails backend) should be located at localhost:3000
    * API namespace would be `/api/v1`

## Templates and styling

Templates are handled by *htmlbars*, while styling is done with SASS.
There's a main SCSS file holding all style information in the app, located in
`app/styles/app.scss`. Foundation variables are stored under the same directory
in `_foundation.scss`.

## Data manipulation

* [Ember Data](https://github.com/emberjs/data) takes care of data storage and
CRUD operations.
* Data exchange is managed by [ActiveModelAdapter](http://emberjs.com/api/data/classes/DS.ActiveModelAdapter.html), which is the JavaScript counterpart of [ActiveModel::Serializer](https://github.com/rails-api/active_model_serializers) Ruby gem.
* There are plans on expanding the storage capabilities from browser's local storage to IndexedDB (see #62)
* For more information on how the data is organized, see the `app/models` directory.

## Contributing

Fork, work on `develop` branch, send pull request.
Please try to squash the related commits with `git rebase` if possible.

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build -e production` (production)

### Deploying

Deployment is done with [Mina](http://mina-deploy.github.io/mina/).

```
mina deploy on=staging
# or
mina deploy on=production
```

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](http://www.ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

