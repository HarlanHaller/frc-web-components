import { html, css, LitElement, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';

export default class PidCommand extends LitElement {
  @property({ type: Number }) p = 0;
  @property({ type: Number }) i = 0;
  @property({ type: Number }) d = 0;
  @property({ type: Number }) setpoint = 0;
  @property({ type: Boolean }) running = false;

  static styles = css`
    :host {
      display: inline-grid;
      grid-template-columns: min-content auto;
      grid-template-rows: auto auto auto auto auto;
      column-gap: 10px;
      row-gap: 8px;
      align-items: center;
      width: 150px;
      height: auto;
      font-family: sans-serif;
      color: var(--frc-pid-controller-text-color, black);
    }

    label {
      font-weight: bold;
      text-align: right;
    }

    input[type='number'] {
      width: 100%;
      min-width: 50px;
      display: inline-block;
      box-sizing: border-box;
      padding-left: 5px;
      border-radius: 3px;
      line-height: 36px;
      height: 36px;
      border: 1px solid var(--frc-pid-controller-input-border-color, #e0e0e0);
      color: var(--frc-pid-controller-text-color, black);
      background: var(--frc-pid-controller-input-background-color, white);
    }

    input[type='checkbox'] {
      justify-self: right;
      margin: 0;
      width: 16px;
      height: 16px;
    }

    label[for='running'] {
      justify-self: left;
    }
  `;

  onPChange(ev: InputEvent): void {
    this.p = parseFloat((ev as any).target.value);
  }

  onIChange(ev: InputEvent): void {
    this.i = parseFloat((ev as any).target.value);
  }

  onDChange(ev: InputEvent): void {
    this.d = parseFloat((ev as any).target.value);
  }

  onSetpointChange(ev: InputEvent): void {
    this.setpoint = parseFloat((ev as any).target.value);
  }

  onRunningClick(): void {
    this.running = !this.running;
  }

  render(): TemplateResult {
    return html`
      <input
        type="checkbox"
        id="running"
        ?checked=${this.running}
        @click=${this.onRunningClick}
      />
      <label for="running">Running</label>
      <label>P</label>
      <input type="number" value=${this.p} @change=${this.onPChange} />
      <label>I</label>
      <input type="number" value=${this.i} @change=${this.onIChange} />
      <label>D</label>
      <input type="number" value=${this.d} @change=${this.onDChange} />
      <label>Setpoint</label>
      <input
        type="number"
        value=${this.setpoint}
        @change=${this.onSetpointChange}
      />
    `;
  }
}

if (!customElements.get('frc-pid-command')) {
  customElements.define('frc-pid-command', PidCommand);
}

declare global {
  interface HTMLElementTagNameMap {
    'frc-pid-command': PidCommand;
  }
}
