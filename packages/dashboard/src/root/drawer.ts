/* eslint-disable import/extensions */
import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { dashboardProvider } from '../context-providers';
import FrcDashboard from '../frc-dashboard';
import './drawer-sidebar';

@customElement('dashboard-drawer')
export default class DashboardDrawer extends LitElement {
  @state() dashboard!: FrcDashboard;
  @state() selectedElement?: HTMLElement;
  @state() editors: HTMLElement[] = [];

  static styles = css`
    :host {
      display: block;
    }

    .dashboard {
      display: flex;
    }

    .editors {
      display: flex;
      flex-direction: column;
      height: 100vh;
      width: 370px;
      gap: 10px;
      font-family: sans-serif;
      padding: 10px 0;
      background: rgb(240, 240, 240);
      box-sizing: border-box;
    }

    .editors summary {
      font-weight: bold;
    }

    .editors-header {
      font-size: 18px;
      color: purple;
      margin: 5px 0 10px;
      padding: 0 10px;
    }

    .editor-components {
      padding: 0 10px;
      flex: 1;
      overflow: auto;
    }

    .editor-components details {
      margin-bottom: 10px;
    }
  `;

  constructor() {
    super();
    dashboardProvider.addConsumer(this);
  }

  firstUpdated(): void {
    this.dashboard.subscribe('elementSelect', () => {
      this.selectedElement = this.dashboard.getSelectedElement() ?? undefined;
      this.#updateEditors();
    });
  }

  #getEditorTags(): string[] {
    return this.dashboard.getComponentIdsOfType('elementEditor');
  }

  #updateEditors(): void {
    this.editors.forEach((editor) => {
      editor.remove();
      this.dashboard.unmount(editor);
    });
    const tags = this.#getEditorTags();
    const editorComponents =
      this.renderRoot.querySelector('.editor-components');
    tags.forEach((tag) => {
      const editor = this.dashboard.create('elementEditor', tag);
      if (editor) {
        const container = document.createElement('details');
        container.setAttribute('open', '');
        container.innerHTML = `<summary>${tag}</summary>`;
        container.appendChild(editor);
        editorComponents?.append(container);
        this.editors.push(container);
      }
    });
  }

  render(): TemplateResult {
    return html`
      <div class="dashboard">
        <dashboard-drawer-sidebar
          .dashboard=${this.dashboard}
        ></dashboard-drawer-sidebar>
        <div class="editors">
          ${this.selectedElement
            ? html`
                <header class="editors-header">
                  ${this.dashboard?.getElementDisplayName(this.selectedElement)}
                </header>
              `
            : null}
          <div class="editor-components">${this.renderElementTree()}</div>
        </div>
      </div>
    `;
  }

  renderElementTree(): TemplateResult {
    if (!this.selectedElement) {
      return html``;
    }
    const selectedTab = this.selectedElement.closest('dashboard-tab');
    return html`
      <details open>
        <summary>Element Tree</summary>
        <dashboard-element-tree-node
          style="padding: 7px 10px 10px 0"
          .element=${selectedTab}
          .dashboard=${this.dashboard}
          expanded
        ></dashboard-element-tree-node>
      </details>
    `;
  }
}
