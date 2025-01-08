/* eslint-disable react-hooks/rules-of-hooks */
import React, { useMemo, useCallback, memo } from "react";

const punctuationMarks = [
  ".",
  ",",
  "!",
  "?",
  ":",
  ";",
  "@",
  "$",
  "*",
  "(",
  ")",
  "-",
  "=",
  "^",
  "%",
  "[",
  "]",
  "{",
  "}",
  "<",
  ">",
  "/",
  "\\",
  "'",
  "|",
  "_",
  "+",
  "`",
  "~",
];

const SelectPieceOfText = (props) => {
  const {
    text = "",
    search = "",
    highlightClassName = "",
    containerClassName = "",
    className = "",
    startWord = false,
    endWord = false,
    fullWord = false,
    all = false,
    spaceIgnore = false,
    caseIgnore = false,
  } = props;

  const searchText = useMemo(() => {
    let searchText = search;
    if (spaceIgnore) searchText = searchText.trim();
    if (caseIgnore) searchText = searchText.toLocaleLowerCase();

    return searchText;
  }, [caseIgnore, search, spaceIgnore]);

  const searchedText = useMemo(() => {
    let searchedText = text;
    if (spaceIgnore) searchedText = searchedText.trim();
    if (caseIgnore) searchedText = searchedText.toLocaleLowerCase();

    return searchedText;
  }, [caseIgnore, spaceIgnore, text]);

  const getFirstIndex = useCallback(
    (startIndex = 0) => {
      const index = searchedText.indexOf(searchText, startIndex);

      if (!searchText || !searchedText || !~index) return -1;

      let conditions;

      if (startWord) {
        conditions =
          index !== 0 &&
          searchedText[index - 1] !== " " &&
          !punctuationMarks.includes(searchedText[index - 1]);
      }

      if (endWord) {
        conditions =
          (typeof conditions === "undefined" || conditions) &&
          searchedText.length !== index + searchText.length &&
          searchedText[index + searchText.length] !== " " &&
          !punctuationMarks.includes(searchedText[index + searchText.length]);
      }

      if (fullWord) {
        conditions =
          (typeof conditions === "undefined" || conditions) &&
          ((index !== 0 &&
            searchedText[index - 1] !== " " &&
            !punctuationMarks.includes(searchedText[index - 1])) ||
            (searchedText.length !== index + searchText.length &&
              searchedText[index + searchText.length] !== " " &&
              !punctuationMarks.includes(
                searchedText[index + searchText.length]
              )));
      }

      if (conditions) {
        return getFirstIndex(index + 1);
      }
      return index;
    },
    [endWord, fullWord, startWord, searchText, searchedText]
  );

  const getAllIndexes = useCallback(() => {
    const index = searchedText.indexOf(searchText);

    if (!searchText || !searchedText || !~index) return -1;

    const indexes = [];

    const getIndexes = (startIndex = 0) => {
      const index = getFirstIndex(startIndex);

      if (!~index) return;

      indexes.push(index);
      getIndexes(index + 1);
    };

    getIndexes();

    return indexes;
  }, [getFirstIndex, searchText, searchedText]);

  const highlightFirstWord = useCallback(() => {
    const index = getFirstIndex();

    if (~index) {
      const beforeHighlightText = text.substring(0, index);
      const highlightText = text.substr(index, searchText.length);
      const afterHighlightText = text.substring(index + searchText.length);

      const beforeHighlightTextElement = beforeHighlightText && (
        <span key="before" className={className}>
          {beforeHighlightText}
        </span>
      );

      const afterHighlightTextElement = afterHighlightText && (
        <span key="after" className={className}>
          {afterHighlightText}
        </span>
      );

      return [
        ...([beforeHighlightTextElement] || []),
        <span key="highlight" className={highlightClassName}>
          {highlightText}
        </span>,
        ...([afterHighlightTextElement] || []),
      ];
    }

    return <span className={className}>{text}</span>;
  }, [className, getFirstIndex, highlightClassName, searchText.length, text]);

  const highlightAllWord = useCallback(() => {
    const indexes = getAllIndexes();

    if (indexes.length) {
      const { highlightedTexts, lastEndIndex } = indexes.reduce(
        (accumData, index) => {
          const { highlightedTexts, lastEndIndex } = accumData;

          const beforeHighlightText = text.substring(lastEndIndex, index);
          const highlightText = text.substr(index, searchText.length);

          const beforeHighlightTextElement = beforeHighlightText && (
            <span key={`before${index}`} className={className}>
              {beforeHighlightText}
            </span>
          );

          const highlightTextElement = (
            <span key={`highlight${index}`} className={highlightClassName}>
              {highlightText}
            </span>
          );

          return {
            lastEndIndex: index + searchText.length,
            highlightedTexts: [
              ...highlightedTexts,
              beforeHighlightTextElement,
              highlightTextElement,
            ],
          };
        },
        { lastEndIndex: 0, highlightedTexts: [] }
      );

      const afterHighlightText = text.substring(lastEndIndex);

      const afterHighlightTextElement = afterHighlightText && (
        <span key="after" className={className}>
          {afterHighlightText}
        </span>
      );

      return [...highlightedTexts, ...([afterHighlightTextElement] || [])];
    }

    return <span className={className}>{text}</span>;
  }, [className, getAllIndexes, highlightClassName, searchText.length, text]);

  const renderElements = useCallback(() => {
    if (all) {
      return highlightAllWord();
    }
    return highlightFirstWord();
  }, [all, highlightAllWord, highlightFirstWord]);

  return <span className={containerClassName}>{renderElements()}</span>;
};

const memoFn = (props, nextProps) => {
  const updated = Object.entries(props).reduce((accumBool, [key, value]) => {
    if (!accumBool || nextProps[key] !== value) return false;
    return true;
  }, true);

  return updated;
};

export default memo(SelectPieceOfText, memoFn);
