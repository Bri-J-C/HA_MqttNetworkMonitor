import { LitElement, html, css } from 'lit';
import { fetchTags, createTag, renameTag, deleteTag } from '../services/api.js';

class TagRegistrySettings extends LitElement {
  static properties = {
    _tags: { type: Array, state: true },
    _loading: { type: Boolean, state: true },
    _newTagName: { type: String, state: true },
    _renamingTag: { type: String, state: true },
    _renameValue: { type: String, state: true },
    _selectedTags: { type: Object, state: true },
  };

  static styles = css`
    :host { display: block; }

    .section {
      background: #2a2a4a; border-radius: 8px; padding: 20px;
      margin-bottom: 20px;
    }
    .section-title {
      font-size: 12px; color: #666; text-transform: uppercase;
      letter-spacing: 1px; margin-bottom: 16px; font-weight: 600;
    }

    .tag-grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: 8px; margin-bottom: 8px;
    }
    .tag-card {
      background: #1a1a2e; border-radius: 8px; padding: 12px;
      border: 1px solid #2a2a4a; cursor: pointer; transition: all 0.15s;
    }
    .tag-card:hover { border-color: #3a3a5a; background: #1a1a30; }
    .tag-card.selected { border-color: #4fc3f7; background: #1a2a3e; }
    .tag-card-top { display: flex; align-items: center; gap: 8px; margin-bottom: 4px; }
    .tag-card-name { font-size: 14px; color: #ccc; font-weight: 600; }
    .tag-card-count { font-size: 11px; color: #666; margin-bottom: 8px; }
    .tag-card-actions { display: flex; gap: 4px; }
    .icon-btn {
      background: none; border: none; cursor: pointer; font-size: 12px;
      padding: 2px 8px; border-radius: 4px; transition: all 0.15s;
    }
    .icon-btn.delete { color: #666; }
    .icon-btn.delete:hover { color: #ef5350; background: rgba(239,83,80,0.1); }
    .sensor-btn {
      background: none; border: none; cursor: pointer; font-size: 11px;
      padding: 2px 8px; border-radius: 4px;
    }
    .sensor-btn.edit { color: #4fc3f7; }
    .sensor-btn.edit:hover { background: rgba(79,195,247,0.1); }
    .sensor-btn.remove { color: #666; }
    .sensor-btn.remove:hover { color: #ef5350; background: rgba(239,83,80,0.1); }
    .sensor-form { background: #12122a; border-radius: 6px; padding: 10px; margin-top: 6px; }
    .sensor-form-grid { display: grid; gap: 6px; margin-bottom: 6px; }
    .sensor-form-grid input {
      background: #2a2a4a; border: 1px solid #3a3a5a; border-radius: 4px;
      color: #e0e0e0; padding: 6px 8px; font-size: 12px;
    }
    .sensor-form-grid input:focus { outline: none; border-color: #4fc3f7; }
    .sensor-form-actions { display: flex; gap: 6px; }
    .form-btn { border: none; padding: 5px 12px; border-radius: 4px; cursor: pointer; font-size: 12px; }
    .form-btn.save { background: #4fc3f7; color: #1a1a2e; font-weight: 600; }
    .form-btn.cancel { background: #3a3a5a; color: #aaa; }
    .small-input {
      background: #1a1a2e; border: 1px solid #3a3a5a; border-radius: 4px;
      color: #e0e0e0; padding: 4px 10px; font-size: 12px;
    }
    .small-input:focus { outline: none; border-color: #4fc3f7; }
    .small-btn {
      background: #4fc3f7; border: none; color: #1a1a2e; padding: 4px 12px;
      border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: 600;
    }
    .small-btn:hover { background: #81d4fa; }
    .small-btn.cancel { background: #3a3a5a; color: #aaa; }
    .small-btn.cancel:hover { background: #4a4a6a; }
    .add-row { display: flex; gap: 8px; align-items: center; margin-top: 12px; }
  `;

  constructor() {
    super();
    this._tags = [];
    this._loading = true;
    this._newTagName = '';
    this._renamingTag = null;
    this._renameValue = '';
    this._selectedTags = new Set();
  }

  connectedCallback() {
    super.connectedCallback();
    this._loadTags();
  }

  async _loadTags() {
    this._loading = true;
    try {
      const tags = await fetchTags().catch(() => []);
      this._tags = Array.isArray(tags)
        ? tags.map(t => (typeof t === 'string' ? { tag: t, count: 0 } : t)).sort((a, b) => a.tag.localeCompare(b.tag))
        : [];
    } finally {
      this._loading = false;
    }
  }

  render() {
    const selectedCount = this._selectedTags ? this._selectedTags.size : 0;

    return html`
      <div class="section">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <div class="section-title" style="margin-bottom: 0;">Tag Registry</div>
          <span style="font-size: 10px; color: #555;">Server-managed tags only</span>
        </div>

        ${selectedCount > 0 ? html`
          <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 12px; padding: 8px 12px; background: #12122a; border-radius: 6px;">
            <span style="font-size: 12px; color: #ccc;">${selectedCount} selected</span>
            <button class="small-btn cancel" style="font-size: 11px; padding: 3px 10px;"
              @click=${this._deleteSelectedTags}>Delete Selected</button>
            <button class="small-btn cancel" style="font-size: 11px; padding: 3px 10px;"
              @click=${() => this._selectedTags = new Set()}>Deselect All</button>
          </div>
        ` : ''}

        ${this._tags.length > 0 ? html`
          <div class="tag-grid">
            ${this._tags.map(item => this._renderTagCard(item))}
          </div>
        ` : html`<div style="color: #555; font-size: 13px; margin-bottom: 12px;">No tags created yet</div>`}

        ${this._renamingTag ? html`
          <div class="sensor-form" style="margin-top: 12px;">
            <div style="font-size: 11px; color: #888; margin-bottom: 6px;">Rename "${this._renamingTag}"</div>
            <div class="sensor-form-grid" style="grid-template-columns: 1fr;">
              <input type="text" .value=${this._renameValue}
                @input=${(e) => this._renameValue = e.target.value}
                @keydown=${(e) => { if (e.key === 'Enter') this._saveRename(this._renamingTag); if (e.key === 'Escape') this._cancelRename(); }}>
            </div>
            <div class="sensor-form-actions">
              <button class="form-btn save" @click=${() => this._saveRename(this._renamingTag)}>Rename</button>
              <button class="form-btn cancel" @click=${this._cancelRename}>Cancel</button>
            </div>
          </div>
        ` : ''}

        <div class="add-row" style="margin-top: 12px;">
          <input class="small-input" type="text" placeholder="New tag name..."
            .value=${this._newTagName}
            @input=${(e) => this._newTagName = e.target.value}
            @keydown=${(e) => e.key === 'Enter' && this._createTag()}>
          <button class="small-btn" @click=${this._createTag}>Create Tag</button>
        </div>
      </div>
    `;
  }

  _renderTagCard(item) {
    const isSelected = this._selectedTags && this._selectedTags.has(item.tag);
    const count = item.device_count || item.count || 0;

    return html`
      <div class="tag-card ${isSelected ? 'selected' : ''}"
        role="checkbox"
        aria-checked=${isSelected ? 'true' : 'false'}
        aria-label="Tag: ${item.tag}, used by ${count} device${count !== 1 ? 's' : ''}"
        tabindex="0"
        @click=${() => this._toggleTagSelection(item.tag)}
        @keydown=${(e) => (e.key === 'Enter' || e.key === ' ') && this._toggleTagSelection(item.tag)}>
        <div class="tag-card-top">
          <span class="tag-card-name">${item.tag}</span>
        </div>
        <div class="tag-card-count">${count} device${count !== 1 ? 's' : ''}</div>
        <div class="tag-card-actions">
          <button class="sensor-btn edit" aria-label="Rename tag ${item.tag}"
            @click=${(e) => { e.stopPropagation(); this._startRename(item.tag); }}>Rename</button>
          <button class="sensor-btn remove" aria-label="Delete tag ${item.tag}"
            @click=${(e) => { e.stopPropagation(); this._deleteTag(item.tag); }}>Delete</button>
        </div>
      </div>
    `;
  }

  _toggleTagSelection(tag) {
    const next = new Set(this._selectedTags);
    if (next.has(tag)) next.delete(tag);
    else next.add(tag);
    this._selectedTags = next;
  }

  async _deleteSelectedTags() {
    const tags = [...this._selectedTags];
    if (!confirm(`Delete ${tags.length} tag${tags.length !== 1 ? 's' : ''}?`)) return;
    for (const tag of tags) {
      try { await deleteTag(tag); } catch (e) { console.error(e); }
    }
    this._selectedTags = new Set();
    await this._loadTags();
  }

  _startRename(tag) {
    this._renamingTag = tag;
    this._renameValue = tag;
  }

  _cancelRename() {
    this._renamingTag = null;
    this._renameValue = '';
  }

  async _saveRename(oldTag) {
    const newName = this._renameValue.trim();
    if (!newName || newName === oldTag) { this._cancelRename(); return; }
    try {
      await renameTag(oldTag, newName);
      await this._loadTags();
    } catch (e) {
      console.error('Failed to rename tag:', e);
    }
    this._cancelRename();
  }

  async _createTag() {
    const name = this._newTagName.trim();
    if (!name) return;
    try {
      await createTag(name);
      this._newTagName = '';
      await this._loadTags();
    } catch (e) {
      console.error('Failed to create tag:', e);
    }
  }

  async _deleteTag(tag) {
    const item = this._tags.find(t => t.tag === tag);
    if (item && item.count > 0) {
      if (!confirm(`"${tag}" is used by ${item.count} device(s). Delete anyway?`)) return;
    }
    try {
      await deleteTag(tag);
      await this._loadTags();
    } catch (e) {
      console.error('Failed to delete tag:', e);
    }
  }
}

customElements.define('tag-registry-settings', TagRegistrySettings);
