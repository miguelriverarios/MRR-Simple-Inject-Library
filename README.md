<h3 align="center">MRR Simple Inject IOC Framework</h3>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <ul>
        <li><a href="#things-you-should-be-familiar-with">Things You Should be Familiar With</a></li>
      </ul>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#testing">Testing</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a>
    <ul>
        <li><a href="#current-limitations">Current Limitations</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

This project started as a technical assignment for a job application, but, in building out the library, I thought it would be a good opportunity to get into the weeds a bit on what makes a good library. This will be an ever evolving project taking into account best practices as I come across them. As a bonus, this provides a minimal implenetation for a functioning dependency injection framework.

## Things You Should be Familiar With

- [Dependency Injection](https://dev.to/azure/dependency-injection-in-javascript-101-2b1e)
- [Classes in JS](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

Make sure you have node and npm installed.

To check if you have Node.js installed, run this in your terminal:

```sh
node -v
```

If your terminal returns a version number, you're good to go. npm is distributed with Node.js, so if you have node, you should have npm, but to confirm, run this in your terminal:

```sh
npm -v
```

[Go here if you do not have node install](https://nodejs.org/en/). If you want to update npm, use the following command in terminal:

```sh
npm install npm@latest -g
```

My go to package manager is yarn. You can get yarn via the following command (this is optional):

```sh
npm install --global yarn

```

### Installation

1. Clone the repo into your local directory
   ```sh
   git clone https://github.com/miguelriverarios/mrr-simple-inject-library.git
   ```
2. Install NPM packages

   ```sh
   npm install
   ```

   or with yarn

   ```
   yarn
   ```

### Testing

Tests are performed using the [jasmine-karma framework](https://ivantay2003.medium.com/setting-up-karma-with-jasmine-791d83a71fc4). To run the test methods, use the following command:

```
npm test
```

Or with yarn:

```
yarn test
```

If successful, a browser window will open showing test results.

   <!-- USAGE EXAMPLES -->

## Usage

This library provides a simple framework for implementing dependency injectio via an IoC container. Let's say you have a class representing a Superhero like so:

```
class Superhero {
    constructor(superpower) {
        this.superpower = superower;
    }
}
```

A Superhero isn't a superhero without a Superpower, so let's pretend Superpower is defined as such:

```
class Superpower {
    constructor() {
        this.ability = "heat vision";
    }
}
```

Normally you'd have to define these sequentially before instantiating a Superhero, but with this library you can do it like so:

```
require("/src/injection.js");
const inject = new SimpleInject();

class Superhero {
    constructor(superpower) {
        this.superpower = superpower;
    }
}
inject.register("superhero", ["superpower", Superhero]);

class Superpower {
    constructor() {
        this.ability = "heat vision";
    }
}
inject.register("superpower", [Superpower]);

const superhero = inject.get("superhero");

console.log(superhero.superpower.ability); // heat vision

```

<!-- ROADMAP -->

## Roadmap

See the [open issues](https://github.com/miguelriverarios/MRR-Simple-Inject-Library/issues) for a list of proposed features (and known issues).

### Current Limitations

- No support for checking or resolving circular dependencies
- No check for dependency depth within stack (could result in long runtimes if dependencies are considerably layerd)
- Services must be defined as classes (ie no functions, etc)

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a [Pull Request](https://github.com/miguelriverarios/MRR-Simple-Inject-Library/pulls)

All additional features should include corresponding test methods.

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->

## Contact

Your Name - miguel.e.rivera.rios@gmail.com

Project Link: [https://github.com/miguelriverarios/MRR-Simple-Inject-Library](https://github.com/miguelriverarios/MRR-Simple-Inject-Library.git)

<!-- ACKNOWLEDGEMENTS -->

## Acknowledgements

- [Best README Template](https://github.com/othneildrew/Best-README-Template)
- [Dependency Injection in Javascript 101](https://dev.to/azure/dependency-injection-in-javascript-101-2b1e)
- [Dependency Injection Explained via Javascript](https://blog.jeremylikness.com/blog/2014-06-28_dependency-injection-explained-javascript/)
- [jsInject](https://github.com/JeremyLikness/jsInject/blob/master/jsTestDriver.conf)
- [Choose an Open Source License](https://choosealicense.com)
- [Karma-Jasmine Setup](https://ivantay2003.medium.com/setting-up-karma-with-jasmine-791d83a71fc4)
