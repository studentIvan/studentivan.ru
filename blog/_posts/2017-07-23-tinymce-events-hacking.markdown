---
title: TinyMCE Events Hacking
layout: post
date: 2017-07-23 20:06:18 +0400
---

#### How I faced with TinyMCE

A few months ago I did start the work on **Plomino** project. 

At first, the Plomino is a visual form builder and it has built with **TinyMCE**.

I was a Senior Developer on this project and have solved a lot of issues with TinyMCE to make it working as we were wanted.

#### How to set the callbacks on TinyMCE events, without setup

```javascript
const editor = tinymce.get(editorId);

if (editor) {
  /* Basic (often) events */
  /* 
   * onChange - firing on any change on tinymce editor 
   * warning - this event works unpredictable, better to check 
   * something like a control sum of content to be sure that it changed!
   */
  editor.onChange.add(this.onTinyMCEEditorChange.bind(this));
  /* 
   * onKeyDown - can be used to react on keydown events 
   * warning - you can't prevent the event using this callback!
   */
  editor.onKeyDown.add(this.onTinyMCEEditorKeyDown.bind(this));
  /* 
   * onKeyUp - can be used to react on keyup events 
   * warning - you can't prevent the event using this callback!
   */
  editor.onKeyUp.add(this.onTinyMCEEditorKeyUp.bind(this));
  /* 
   * onNodeChange - something like onChange but contains good things:
   * nodeChangeEvent.element - HTMLElement link
   * nodeChangeEvent.selectionChange - selection-state-changed trigger
   */
  editor.onNodeChange.add(this.onTinyMCEEditorNodeChange.bind(this));
  /* 
   * onMouseDown - just mousedown event callback
   */
  editor.onMouseDown.add(this.onTinyMCEEditorMouseDown.bind(this));
}
```

#### How to set the callback on TinyMCE onKeyDown event to have a possibility to prevent the event

`onKeyDown` tinymce event has no possibility to prevent the event. This problem can be solved with additional javascript code (the example below contains jQuery)

```javascript
const $edContainer = $(editor.getContainer());
if ($edContainer.length) {
  const $iframe = $edContainer.find('iframe');
  const iframeDocument = (<HTMLIFrameElement> $iframe.get(0))
    .contentWindow.document;
  iframeDocument.addEventListener('keydown', (e) => {
    return this.beforeTinyMCEEditorKeyDown(editor, e);
  }, true);
}
```

beforeTinyMCEEditorKeyDown can look like this

```javascript
beforeTinyMCEEditorKeyDown(editor: TinyMceEditor, e: KeyboardEvent) {
  if (e.keyCode === 8) { // BACKSPACE PRESSED
    // ... our code here ...
    /** start prevent event */
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    return false;
    /** end prevent event */
  }
}
```

#### How to change the TinyMCE id on the fly (hackable)

```javascript
/* currentEditorId - is our searching editor's id */
tinymce.editors.forEach((editor) => {
  const newId = 'qwerty';
  if (editor.targetElm && editor.targetElm.id 
    && editor.targetElm.id === currentEditorId
  ) {
    editor.id = newId; // id of editor object
    editor.settings.id = newId; // id in tinymce settings
    editor.getContainer().firstElementChild
      .children[2].firstElementChild.id = newId + '_ifr'; // id of iframe
    editor.render(); // will rebuild the editors object
  
    // ... here can be some after-render function
  }
});
```

#### How to remove the TinyMCE correctly

```javascript
/* editorId - is our searching editor's id */
try {
  tinymce.EditorManager
    .execCommand('mceRemoveEditor', true, editorId);
}
catch (e) {
  tinymce.editors.forEach((editor, index) => {
    if (editor.id === editorId) {
      tinymce.editors.splice(index, 1);
      return false;
    }
  });

  Object.keys(tinymce.editors).forEach((key) => {
    if (key === editorId) {
      delete tinymce.editors[key];
      return false;
    }
  });
}
```

Hope that I saved a little bit of your time.