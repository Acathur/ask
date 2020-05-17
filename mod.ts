import { PromptOpts } from './src/core/prompt.ts';
import { Result } from './src/core/result.ts';

import Input from './src/input.ts';
import Number, { NumberOpts } from './src/number.ts';
import Confirm, { ConfirmOpts } from './src/confirm.ts';

class Ask {
  constructor() {
    // TODO: global options
  }

  async input(opts: PromptOpts): Promise<Result> {
    return new Input(opts).run();
  }

  async number(opts: NumberOpts): Promise<Result> {
    return new Number(opts).run();
  }

  async confirm(opts: ConfirmOpts): Promise<Result> {
    return new Confirm(opts).run();
  }

  async prompt(questions: PromptOpts[] | ConfirmOpts[] | NumberOpts[]): Promise<Result> {
    const answers = {};
    let cache: PromptOpts;

    for (let i = 0; i < questions.length; i++) {
      cache = questions[i];

      switch (cache.type) {
        case 'input':
          Object.assign(answers, await this.input(cache));
          break;

        case 'number':
          Object.assign(answers, await this.number(cache));
          break;

        case 'confirm':
          Object.assign(answers, await this.confirm(cache));
          break;

        default:
          break;
      }
    }

    return answers;
  }
}

export default Ask;
