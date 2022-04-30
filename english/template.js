
const fs = require('fs');

class Generator {

    constructor(title, partNo = 1, lines = 20, start = 1) {
        this.title = title;
        this.part = `part ${partNo}`;
        this.lines = lines;
        this.start = start;
        this._markdown = '';
    }

    get markdown() {
        if (this._markdown) {
            return this._markdown;
        }

        let text = `
# ${this.title}

- part ${this.part}

| 中文                       | 英文                           |
| -------------------------- | ------------------------------ |
        `;

        for (let i = this.start; i <= this.lines; ++i) {
            text += `| ${i}. aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa | ${i}. aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa |`;
            text += '\n';
        }

        return this._markdown = text;

    }

    export(fileName) {
        fs.writeFileSync(fileName, this.markdown);
    }

}

for (let i = 14; i <= 14; ++i) {
    new Generator(`lesson-14-${i}`).export(`lesson${i}.md`);
}

console.log('successfully!');
