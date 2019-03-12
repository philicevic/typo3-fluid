'use babel';

import Typo3FluidView from './typo3-fluid-view';
import { CompositeDisposable } from 'atom';

export default {

  typo3FluidView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.typo3FluidView = new Typo3FluidView(state.typo3FluidViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.typo3FluidView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'typo3-fluid:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.typo3FluidView.destroy();
  },

  serialize() {
    return {
      typo3FluidViewState: this.typo3FluidView.serialize()
    };
  },

  toggle() {
    console.log('Typo3Fluid was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
