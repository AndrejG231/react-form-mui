# Simple form using [React](https://react.dev/), [MUI](https://mui.com/), [React hook form](https://react-hook-form.com/) and [Yup](https://github.com/jquense/yup)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts
### `yarn start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn test`
Launches the test runner in the interactive watch mode.\

### `yarn build`
Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## Internal libraries
### `utils/form-control`
The Form Config module is a TypeScript library designed to simplify the configuration and management of form fields within a web application. It allows you to centralized configuration for all form fields.

#### Types
##### FormControl
FormControl is a union type that represents different types of form controls.

##### FormConfig
`FormConfig` is an array type that defines the configuration for multiple form controls, allowing you to define the structure of your form.

##### SelectConfigProps\<TValue>:
This type represents the properties that are passed to a function responsible for rendering a select input control. It's designed to provide the necessary props for rendering and managing the select input. It is specific to the value type `TValue` (e.g., `string` or `number`).

##### TextFieldConfigProps\<TValue>:
This type represents the properties that are passed to a function responsible for rendering a text input control. Similar to SelectConfigProps, it is specific to the value type `TValue`.

#### Functions
##### createFormConfig
Function used to create centralized form fields configuration:

###### Parameters:

`config (type: FormConfig)`: An array that defines the configuration for multiple form controls. Each element in the array should be a FormControl, representing different types of form controls.

###### Return Value:

`CreateConfigResult<Config>`: An object that contains the following properties:  
 - `fields`: An array of form controls, mirroring the config parameter.  
 - `defaultValues`: An object that holds default values for each form control based on the defaultValue property specified in the form configuration.
- `validationSchema`: A Yup validation schema that combines the validation rules of individual form controls into a single schema.
- `render`: A function that, when called, renders the form fields based on the configuration.

#### Example
Here's an example of how you can use the Form Config module to configure and manage form fields: 

```
import { createFormConfig } from 'form-config-module';

// Define your form configuration
const formConfig = [
  {
    inputType: 'text',
    valueType: 'string',
    name: 'name',
    label: 'Name',
  },
  {
    inputType: 'select',
    valueType: 'number',
    name: 'age',
    label: 'Age',
    options: [{ value: 18, label: '18' }, { value: 25, label: '25' }],
  },
  // Add more form controls as needed
];

// Create a form configuration object
const configResult = createFormConfig(formConfig);

// Use configResult.fields for rendering form fields
// Use configResult.defaultValues to set default values for the form
// Use configResult.validationSchema for Yup validation schema

// Render the form fields
const renderedFields = configResult.render();

// Integrate the renderedFields into your React component
```
