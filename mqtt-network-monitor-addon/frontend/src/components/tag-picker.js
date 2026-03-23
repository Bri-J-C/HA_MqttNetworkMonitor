import { LitElement, html, css } from 'lit';
import { fetchTags, createTag } from '../services/api.js';

/**
 * tag-picker — reusable dropdown for selecting/managing tags.
 *
 * Properties:
 *   selectedTags {Array<string>} — currently selected tags (two-way via events)
 *
 * Events:
 *   tag-add   — detail: { tag }
 *   tag-remove — detail: { tag }
 */
class TagPicker extends LitElement {
  static properties = {
    selectedTags: { type: Array },
    _allTags: { type: Array, state: true },
    _open: { type: Boolean, state: true },
    _showCreate: { type: Boolean, state: true },
    _newTagName: { type: String, state: true },
    _creating: { type: Boolean, state: true },
  };

  static styles = css`
    :host { display: inline-block; position: relative; }

    .trigger {
      background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #fff;
      padding: 6px 14px; border-radius: 16px; cursor: pointer; font-size: 13px;
      transition: all 0.2s; display: flex; align-items: center; gap: 6px;
      user-select: none;
    }
    .trigger:hover { background: rgba(255,255,255,0.1); color: rgba(255,255,255,0.8); border-color: rgba(255,255,255,0.15); }
    .trigger.has-selected { border-color: #00D4FF; color: #00D4FF; }
    .arrow { font-size: 10px; }

    .dropdown {
      position: absolute; top: calc(100% + 4px); left: 0;
      background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px;
      min-width: 200px; max-height: 280px; overflow-y: auto;
      z-index: 200; box-shadow: 0 8px 24px rgba(0,0,0,0.4);
    }

    .dropdown-item {
      display: flex; align-items: center; gap: 8px;
      padding: 8px 14px; cursor: pointer; font-size: 13px; color: rgba(255,255,255,0.8);
      transition: background 0.15s;
    }
    .dropdown-item:hover { background: rgba(255,255,255,0.1); }
    .checkbox {
      width: 16px; height: 16px; border: 1.5px solid rgba(255,255,255,0.12); border-radius: 3px;
      display: flex; align-items: center; justify-content: center; flex-shrink: 0;
      font-size: 11px; color: #0d0d1f; transition: all 0.15s;
    }
    .dropdown-item.checked .checkbox {
      background: #00D4FF; border-color: #00D4FF;
    }

    .dropdown-divider {
      border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 4px 0;
    }

    .create-row {
      padding: 8px 14px; display: flex; gap: 6px; align-items: center;
    }
    .create-link {
      font-size: 12px; color: #fff; cursor: pointer; transition: color 0.15s;
    }
    .create-link:hover { color: #00D4FF; }

    .create-input {
      flex: 1; background: #0d0d1f; border: 1px solid rgba(255,255,255,0.1);
      border-radius: 4px; color: #fff; padding: 4px 8px;
      font-size: 12px; min-width: 0;
    }
    .create-input:focus { outline: none; border-color: #00D4FF; }
    .create-btn {
      background: #00D4FF; border: none; color: #0d0d1f; padding: 4px 10px;
      border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: 600;
      white-space: nowrap;
    }
    .create-btn:disabled { opacity: 0.5; cursor: default; }
    .cancel-btn {
      background: none; border: none; color: #fff; cursor: pointer;
      font-size: 16px; line-height: 1; padding: 0 2px;
    }
    .cancel-btn:hover { color: rgba(255,255,255,0.8); }

    .empty { padding: 12px 14px; color: #fff; font-size: 12px; text-align: center; }
  `;

  constructor() {
    super();
    this.selectedTags = [];
    this._allTags = [];
    this._open = false;
    this._showCreate = false;
    this._newTagName = '';
    this._creating = false;
    this._onDocClick = this._onDocClick.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this._loadTags();
    document.addEventListener('click', this._onDocClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._onDocClick);
  }

  async _loadTags() {
    try {
      const data = await fetchTags();
      // API returns array of { tag, count } or just an array of strings
      if (Array.isArray(data)) {
        this._allTags = data.map(item => (typeof item === 'string' ? item : item.tag)).sort();
      }
    } catch (e) {
      console.error('Failed to load tags:', e);
    }
  }

  _onDocClick(e) {
    if (!this._open) return;
    const path = e.composedPath();
    if (!path.includes(this)) {
      this._open = false;
      this._showCreate = false;
    }
  }

  _toggle(e) {
    e.stopPropagation();
    this._open = !this._open;
    if (!this._open) this._showCreate = false;
  }

  _toggleTag(tag) {
    if ((this.selectedTags || []).includes(tag)) {
      this.dispatchEvent(new CustomEvent('tag-remove', {
        detail: { tag }, bubbles: true, composed: true,
      }));
    } else {
      this.dispatchEvent(new CustomEvent('tag-add', {
        detail: { tag }, bubbles: true, composed: true,
      }));
    }
  }

  async _createTag() {
    const name = this._newTagName.trim();
    if (!name || this._creating) return;
    this._creating = true;
    try {
      await createTag(name);
      await this._loadTags();
      // Auto-select the newly created tag
      this.dispatchEvent(new CustomEvent('tag-add', {
        detail: { tag: name }, bubbles: true, composed: true,
      }));
      this._newTagName = '';
      this._showCreate = false;
    } catch (e) {
      console.error('Failed to create tag:', e);
    } finally {
      this._creating = false;
    }
  }

  render() {
    const selected = this.selectedTags || [];
    const hasSelected = selected.length > 0;

    return html`
      <button class="trigger ${hasSelected ? 'has-selected' : ''}" @click=${this._toggle}>
        Tags${hasSelected ? ` (${selected.length})` : ''}
        <span class="arrow">${this._open ? '\u25B2' : '\u25BC'}</span>
      </button>

      ${this._open ? html`
        <div class="dropdown" @click=${(e) => e.stopPropagation()}>
          ${this._allTags.length === 0 && !this._showCreate
            ? html`<div class="empty">No tags in registry</div>`
            : this._allTags.map(tag => html`
              <div class="dropdown-item ${selected.includes(tag) ? 'checked' : ''}"
                @click=${() => this._toggleTag(tag)}>
                <span class="checkbox">${selected.includes(tag) ? '\u2713' : ''}</span>
                ${tag}
              </div>
            `)
          }

          <hr class="dropdown-divider">

          ${this._showCreate ? html`
            <div class="create-row">
              <input class="create-input" type="text" placeholder="New tag name..."
                .value=${this._newTagName}
                @input=${(e) => this._newTagName = e.target.value}
                @keydown=${(e) => e.key === 'Enter' && this._createTag()}
                autofocus>
              <button class="create-btn" ?disabled=${this._creating || !this._newTagName.trim()}
                @click=${this._createTag}>
                ${this._creating ? '...' : 'Create'}
              </button>
              <button class="cancel-btn" @click=${() => { this._showCreate = false; this._newTagName = ''; }}>&times;</button>
            </div>
          ` : html`
            <div class="create-row">
              <span class="create-link" @click=${() => this._showCreate = true}>+ Create new tag</span>
            </div>
          `}
        </div>
      ` : ''}
    `;
  }
}

customElements.define('tag-picker', TagPicker);
