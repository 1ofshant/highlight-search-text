# highlight-search-text

Responsive component for highlighting text by keywords for React. May be useful for searching.
 
## In this [Demo](http://shushan.ofshant.com/) you may get familiar with how the component works.

### Installation

react version >= 16.8

```bash
npm install highlight-search-text --save
```

### Import

```js
import HighlightText from 'highlight-search-text';
```

### Usage

```js
<HighlightText
  search={search}
  text={text}
  highlightClassName="highlight"
  containerClassName="container"
  className="other"
  caseIgnore
  spaceIgnore
  startWord
  endWord
  fullWord
  all
/>
```

### How it works

```html
<HighlightText
  text="Once Upon A Time, In A Galaxy Far..."
  search="on"
  highlightClassName="highlight"
  containerClassName="container"
  className="other"
  caseIgnore
  all
>

<span class="container">
  <span class="highlight">On</span>
  <span class="other">ce Up</span>
  <span class="highlight">on</span>
  <span class="other"> A Time, In A Galaxy Far...</span>
</span>
```

### Attributes

| Attributes          | Type     | Default | Description |
| ----------          | ----     | ------- | ----------- |
| search              | string   | ''      | It’s what we are looking for |
| text                | string   | ''      | It’s where we are looking for |
| highlightClassName  | string   | ''      | It’s the class of highlighted elements |
| containerClassName  | string   | ''      | It’s the class of main container |
| className           | string   | ''      | It's the class of other elements |
| caseIgnore          | boolean  | false   | This option allows to search any piece of text ignoring its case-sensitivity(Uppercase/Lowercase). |
| spaceIgnore         | boolean  | false   | This option allows to search any piece of text ignoring leading and trailing spaces. |
| startWord           | boolean  | false   | This option allows to search any piece of text starting with the entered word exactly. |
| endWord             | boolean  | false   | This option allows to search any piece of text ending with the entered word exactly. |
| fullWord            | boolean  | false   | This option allows to search the whole word within the text. It brings only the  very first match. |
| all                 | boolean  | false   | This option allows to search the whole word with all its matches within the text. |
