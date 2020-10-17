import { LitElement, html, css } from 'lit-element';
import './tools-bottom';
import './wom-viewer';

class WomTools extends LitElement {

  static get styles() {
    return css`
      :host {
        display: block;
        width: 30%;
        position: relative;
        min-width: 5px;
        z-index: 2;
        background: white;
      }

      [part=tools] {
        position: absolute;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        overflow: scroll;
        display: flex;
        flex-direction: column;
      }

      [part=top-menu] {
        width: 100%;
        background: #eee;
        display: block;
        display: flex;
        align-items: center;
      }

      [part=top-menu] vaadin-button {
        color: black;
        padding: 0;
      }

      [part=top-menu] vaadin-button[disabled] {
        color: #999;
      }

      [part=top-menu] vaadin-button[selected] {
        color: blue;
      }

      [part=top-tools-separator] {
        height: 70%;
        width: 1px;
        background: #aaa;
        margin: 0 10px;
      }

      [part=tools-top], [part=tools-bottom] {
        min-height: 10%;
      }

      [part=tools-top] {
        margin: 5px;
        padding-bottom: 15px;
      }

      [part=tools-splitter] {
        height: 100%;
        flex: 1;
      }

      dashboard-tools-bottom {
        overflow: unset;
      }

      [part=node-html-editor] {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        padding-top: 10px;
        box-sizing: border-box;
      }

      [part=node-html-editor] juicy-ace-editor {
        flex: 1;
      }

      [part=node-html-editor] [part=editor-buttons] {
        display: flex;
        justify-content: flex-end;
      }

      [part=node-html-editor] [part=editor-buttons] vaadin-button {
        margin-right: 5px;
      }
    `;
  }

  static get properties() {
    return {
      wom: { type: Object },
      menuItems: { type: Array },
      editingNodeHtml: { type: Boolean },
      nodeHtmlEditorContent: { type: String }
    };
  }

  constructor() {
    super();
    this.wom = null;
    this.toolsTopElement = null;
    this.setMenuItems();
    this.editingNodeHtml = false;
    this.nodeHtmlEditorContent = '';
  }

  setMenuItems() {

    if (!this.wom) {
      return;
    }

    const isNodeSelected = this.wom.getSelectedNode() && this.wom.getSelectedNode() !== this.wom.getRootNode();

    this.menuItems = [
      {
        text: 'Dashboard',
        children: [
          { text: 'About' },
          { text: 'Documentation', action: () => window.open('https://frc-web-components.github.io/', '_blank') },
          { text: 'Update' },
          { component: 'hr' },
          { text: 'Preferences' },
        ]
      },
      {
        text: 'File',
        children: [
          { text: 'New Layout', action: 'newLayout' },
          { text: 'New Window' },
          { component: 'hr' },
          { text: 'Open Layout', action: 'loadLayout' },
          { text: 'Open Recent Layout' },
          { text: 'Open Robot Layout' },
          { component: 'hr' },
          { text: 'Save Layout', action: 'saveLayout' },
          { text: 'Save Robot Layout' },
          { component: 'hr' },
          { text: 'Load Extension', action: this.onLoadExtension },
        ]
      },
      { 
        text: 'Edit',
        children: [
          { text: 'Undo', disabled: this.wom.history.atBeginning(), action: 'undo' },
          { text: 'Redo', disabled: this.wom.history.atEnd(), action: 'redo' },
          { component: 'hr' },
          { text: 'Cut Node', disabled: !isNodeSelected },
          { text: 'Copy Node', disabled: !isNodeSelected },
          { text: 'Paste Node', disabled: !isNodeSelected },
          { text: 'Delete Node', disabled: !isNodeSelected, action: 'removeNode' },
          { component: 'hr' },
          { text: 'Edit Node HTML', disabled: !isNodeSelected, action: this.editNodeHtml },
        ]
      },
      { 
        text: 'View',
        children: [
          { text: 'Scroll to Node', disabled: !isNodeSelected, action: this.onScrollToNode },
        ]
      },
      { 
        text: 'Recording',
        children: [
          { text: 'Start Recording' },
          { text: 'Load Playback' },
        ]
      },
    ];
  }

  addWomListeners() {
    [
      'womNodeSelect', 'womNodeDeselect', 'womActionExecute',
      'womNodeAdd', 'womNodeRemove',
      'womChange', 'womNodePreview', 'womNodePreviewRemove', 'selectionToolToggle'
    ].forEach(eventName => {
      this.wom.addListener(eventName, () => {
        this.setMenuItems();
        this.requestUpdate();
      });
    });
  }
  
  firstUpdated() {
    this.toolsTopElement = this.shadowRoot.querySelector('[part="tools-top"]');

    const observer = new MutationObserver(() => {
      const nodeHtmlEditor = this.shadowRoot.querySelector('juicy-ace-editor');
      nodeHtmlEditor.editor.setValue(this.nodeHtmlEditorContent);
    });
    observer.observe(this.shadowRoot, {
      childList: true
    });
  }

  updated(changedProps) {
    if (changedProps.has('wom') && this.wom) {
      this.addWomListeners();
      this.wom.addListener('womChange', () => {
        if (!this.womViewerNode) {
          this.womViewerNode = this.shadowRoot.querySelector('wom-viewer');
        }
        this.womViewerNode.requestUpdate();
      });
      this.setMenuItems();
    }
  }

  toggleSelectionTool() {
    this.wom.toggleSelectionTool();
  }

  onScrollToNode() {
    this.wom.getSelectedNode().getNode().scrollIntoView();
  }

  onLoadExtension() {
    alert(`Loading Extensions hasn't been implemented yet!`);
  }

  editNodeHtml() {
    this.editingNodeHtml = true;
    const selectedNode = this.wom.getSelectedNode().getNode();
    const editorNode = this.shadowRoot.querySelector('juicy-ace-editor');
    this.nodeHtmlEditorContent = selectedNode.outerHTML;
  }

  menuItemSelected(ev) {
    const item = ev.detail.value;
    if (typeof item.action === 'string') {
      this.wom.executeAction(item.action);
    } else if (typeof item.action === 'function') {
      item.action.bind(this)();
    }
  }

  render() {

    if (this.editingNodeHtml) {
      return html`
        <div part="tools">
          <div part="node-html-editor">
            <juicy-ace-editor
              theme="ace/theme/monokai"
              mode="ace/mode/html"
              tabsize="4"
              wrapmode
            ></juicy-ace-editor>
            <div part="editor-buttons">
              <vaadin-button 
                part="confirm-button" 
                theme="success primary small" 
                aria-label="Confirm"
                @click="${this.onConfirm}"
              >
                Confirm
              </vaadin-button>

              <vaadin-button 
                part="cancel-button" 
                theme="error primary small" 
                aria-label="Cancel"
                @click="${this.onCancel}"
              >
                Cancel
              </vaadin-button>
            </div>
          </div>
        </div>
      `;
    }

    return html`
      <div part="tools">
        <div part="top-menu">

          <vaadin-button 
            theme="icon tertiary" 
            aria-label="Selection Tool"
            title="Selection Tool"
            ?selected="${this.wom.isSelectionEnabled()}"
            @click="${this.toggleSelectionTool}"
          >
            <iron-icon icon="vaadin:area-select"></iron-icon>
          </vaadin-button>
          <vaadin-menu-bar 
            .items="${this.menuItems}"
            theme="small tertiary"
            @item-selected="${this.menuItemSelected}"
          ></vaadin-menu-bar>

        </div>
        <vaadin-split-layout part="tools-splitter" theme="small" orientation="vertical">
          <div part="tools-top" style="height: 40%">
            <div part="wom">
              ${this.wom ? html`
                <wom-viewer
                  .wom="${this.wom}"
                  .node="${this.wom.getRootNode()}"
                  .selectedNode="${this.wom ? this.wom.getSelectedNode() : null}"
                  .container="${this.toolsTopElement}"
                  level="0"
                ></wom-viewer>
              ` : ''}
            </div>
          </div>
          <dashboard-tools-bottom
            part="tools-bottom"
            style="height: 60%"
            .wom="${this.wom}"
          >
          </dashboard-tools-bottom>        
        </vaadin-split-layout>
      </div>
    `;
  }
}

customElements.define('dashboard-wom-tools', WomTools);