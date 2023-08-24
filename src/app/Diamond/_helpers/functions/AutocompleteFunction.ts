import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })

export class AutocompleteFunctions {

    letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    maxTag = 702;
    finalTag = []

    constructor() {
        this.generateTags()
    }

    generateTags() {
        let firstLetter = "";
        let secondIndex = 0;
        let firstIndex = 0;

        for (let i = 0; i < this.maxTag; i++) {
            const tag = { tagIndex: 0, tag: '' }
            firstLetter = secondIndex === this.letters.length ? this.letters[firstIndex] : firstLetter;

            if (secondIndex === this.letters.length) {
                secondIndex = 0;
                firstIndex = firstIndex + 1;
            }

            const secondLetter = this.letters[secondIndex]

            tag.tagIndex = i + 1
            tag.tag = firstLetter + secondLetter
            this.finalTag.push(tag)

            secondIndex++;
        }
    }

    tagFunction(tag) {
        tag = parseInt(tag, 10) ? parseInt(tag, 10) : tag
        tag = tag.toString().trim().toUpperCase()
        let result = ''
        try {
            result = this.finalTag.find(item => item.tagIndex.toString() === tag || item.tag === tag).tag
        } catch (error) {
            result = ''
        }
        return result
    }


    autocompleteCode(code, arr) {
        let value = "";
        for (let i = 0; i < arr.length; i++) {
            if (code.toString().trim().toLowerCase() == arr[i].code.toString().toLowerCase()) {
                value = arr[i].code
            }
        }
        return value;
    }

    autocompleteName(code, arr) {
        let value = "";
        for (let i = 0; i < arr.length; i++) {
            if (code.toString().trim().toLowerCase() == arr[i].name.toString().toLowerCase()) {
                value = arr[i].name
            }
        }
        return value;
    }

    LotAutocompleteFunction(value, arr) {
        const TEMP = arr.filter((option) => option.CODE.toString().toLowerCase() == value.toString().toLowerCase())
        return TEMP
    }




}
