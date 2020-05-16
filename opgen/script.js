'use strict';
import * as Opgen from './opgen.js';
import * as Styles from './styles/styles.js';

// Handling the style of the website
Styles.listenToStyleChangingEvents();

// Handling generating stuffs

Opgen.listenToWhatIWant();