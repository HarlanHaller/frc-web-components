/* eslint-disable import/extensions */
import { html, css, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export const elementName = 'frc-toggle-group';

export const toggleGroupConfig = {
  dashboard: {
    displayName: 'Toggle Group',
  },
  properties: {
    options: {
      type: 'Array',
      changeEvent: 'optionsUpdate',
      defaultValue: ['On', 'Off'],
      input: { type: 'StringArray' },
    },
    value: {
      primary: true,
      type: 'String',
      changeEvent: 'change',
      input: {
        type: 'StringDropdown',
        allowCustomValues: false,
        getOptions({ options }: { options: string[] }): string[] {
          return options;
        },
      },
    },
    direction: {
      type: 'String',
      defaultValue: 'vertical',
      input: {
        type: 'StringDropdown',
        allowCustomValues: false,
        getOptions(): string[] {
          return ['vertical', 'horizontal'];
        },
      },
    },
  },
};

@customElement('frc-toggle-group')
export class ToggleGroup extends LitElement {
  @property({ type: Array }) options = ['On', 'Off'];
  @property({ type: String }) value = '';
  @property({ type: String }) direction = 'vertical';

  static styles = css`
    :host {
      font-size: 15px;
      display: inline-flex;
      flex-direction: var(--frc-toggle-group-direction, column);
      width: 150px;
      height: 300px;
      gap: 0;
    }

    [part='button'] {
      border-radius: 0;
      margin: 0;
      flex: 1;
      font-size: inherit;
      height: 100%;
      padding: 0;
    }
  `;

  async setValue(value: string): Promise<void> {
    this.value = value;
  }

  updated(changedProps: Map<string, unknown>): void {
    if (changedProps.has('options') && !this.options.includes(this.value)) {
      this.value = this.options[0] ?? '';
    }

    // dispatch events
    if (changedProps.has('value')) {
      this.#dispatchChange();
    }

    if (changedProps.has('options')) {
      this.#dispatchOptionsUpdate();
    }

    if (changedProps.has('direction')) {
      this.style.setProperty(
        'flex-direction',
        this.direction === 'vertical' ? 'column' : 'row'
      );
    }
  }

  #dispatchChange(): void {
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      })
    );
  }

  #dispatchOptionsUpdate(): void {
    this.dispatchEvent(
      new CustomEvent('optionsUpdate', {
        detail: { options: this.options },
        bubbles: true,
        composed: true,
      })
    );
  }

  render(): TemplateResult {
    return html`
      ${this.options.map(
        (option) => html`
          <vaadin-button
            part="button"
            theme="contrast small ${this.value === option ? 'primary' : ''}"
            @click="${() => this.setValue(option)}"
          >
            ${option}
          </vaadin-button>
        `
      )}
    `;
  }
}
