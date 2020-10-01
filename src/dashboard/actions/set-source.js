import Action from '../action';
import { setWebbitSource } from './utils';

export default class SetSource extends Action {

  get needsSelection() {
    return true;
  }

  execute({ wom, selectedNode, context }) {
    const { sourceProvider, sourceKey } = context;
    setWebbitSource(
      selectedNode.getNode(), 
      sourceProvider,
      sourceKey
    );
    wom.history.push(wom.getHtml());
    wom.deselectAction();
  }
}