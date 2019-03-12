'use babel';

import Typo3Fluid from '../lib/typo3-fluid';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('Typo3Fluid', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('typo3-fluid');
  });

  describe('when the typo3-fluid:toggle event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.typo3-fluid')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'typo3-fluid:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.typo3-fluid')).toExist();

        let typo3FluidElement = workspaceElement.querySelector('.typo3-fluid');
        expect(typo3FluidElement).toExist();

        let typo3FluidPanel = atom.workspace.panelForItem(typo3FluidElement);
        expect(typo3FluidPanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'typo3-fluid:toggle');
        expect(typo3FluidPanel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.typo3-fluid')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'typo3-fluid:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let typo3FluidElement = workspaceElement.querySelector('.typo3-fluid');
        expect(typo3FluidElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'typo3-fluid:toggle');
        expect(typo3FluidElement).not.toBeVisible();
      });
    });
  });
});
