import { LitElement, Webbit } from '@webbitjs/webbit';
import { getSourceProvider, sourceProviderAdded } from '@webbitjs/store';

export default class NtEntryDefault extends Webbit {

  static get properties() {
    return {
      key: { type: String },
      defaultValue: { type: Object },
    };
  }

  constructor() {
    super();
    this.key = '';

    this.provider = null;
    this.hasProvider = new Promise(resolve => {
      sourceProviderAdded(providerName => {
        if (providerName === 'NetworkTables') {
          this.provider = getSourceProvider('NetworkTables');
          resolve(this.provider);
        }
      });
    });
  }

  async isSourceSet() {
    await this.hasProvider;
    const value = this.provider.getSource(this.key);
    return value !== undefined;
  }

  async update(changedProps) {
    if (!changedProps.has('key') && !changedProps.has('defaultValue'))  {
      return;
    }

    if (!this.key) {
      return;
    }

    await this.isSourceSet();
    this.provider.userUpdate(this.key, this.defaultValue);
  }
}