/* eslint-disable import/extensions */
import { html, css, LitElement, TemplateResult, PropertyValueMap } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import FrcDashboard from '@dashboard/frc-dashboard';
import { dashboardContext } from '@dashboard/context-providers';
import { consume } from '@lit/context';

@customElement('dashboard-source-picker-dialog')
export class SourcePickerDialog extends LitElement {
  @consume({ context: dashboardContext }) dashboard!: FrcDashboard;
  @property({ type: Object }) element?: HTMLElement;

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      height: 100%;
      min-height: 300px;
      width: 100%;
    }
  `;

  onClose(): void {
    this.dispatchEvent(
      new CustomEvent('closeDialog', {
        bubbles: true,
        composed: true,
      })
    );
  }

  protected firstUpdated(): void {
    this.dashboard.subscribe('sourcesDialogOpen', (args: any) => {
      this.element =
        args.element ?? this.dashboard.getSelectedElement() ?? undefined;
    });
  }

  render(): TemplateResult {
    const title = this.element
      ? html`
          Source for
          <span style="color: purple"
            >${this.dashboard.getElementDisplayName(this.element)}</span
          >
        `
      : 'Connect to Source';

    return html`
      <header
        class="draggable"
        style="border-bottom: 1px solid var(--lumo-contrast-10pct); padding: var(--lumo-space-m) var(--lumo-space-l); cursor: move"
      >
        <h2
          style="font-size: var(--lumo-font-size-xl); font-weight: 600; line-height: var(--lumo-line-height-xs); margin: 0;"
        >
          ${title}
        </h2>
      </header>
      <vaadin-scroller
        scroll-direction="vertical"
        style="padding: 0 var(--lumo-space-l); flex: 1"
      >
        <dashboard-sources-editor
          .dashboard=${this.dashboard}
          .element=${this.element}
        ></dashboard-sources-editor>
      </vaadin-scroller>
      <footer
        style="background-color: var(--lumo-contrast-5pct); padding: var(--lumo-space-s) var(--lumo-space-m); text-align: right;"
      >
        <vaadin-button
          theme="tertiary"
          style="margin-inline-end: var(--lumo-space-m);"
          @click="${() => {
            this.onClose();
          }}"
        >
          Close
        </vaadin-button>
      </footer>
    `;
  }
}
