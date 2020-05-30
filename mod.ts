import { PromptOpts, GlobalPromptOpts } from './src/core/prompt.ts';
import { Result } from './src/core/result.ts';

import Input from './src/input.ts';
import Number, { NumberOpts } from './src/number.ts';
import Confirm, { ConfirmOpts } from './src/confirm.ts';

class Ask {
  private opts: GlobalPromptOpts | PromptOpts | NumberOpts | ConfirmOpts;

  constructor(opts?: GlobalPromptOpts) {
    this.opts = opts || {};
  }

  private parseOptions(opts: PromptOpts | NumberOpts | ConfirmOpts) {
    this.opts = { ...this.opts, ...opts };
  }

  async input(opts: PromptOpts): Promise<Result> {
    this.parseOptions(opts);
    return new Input(this.opts as PromptOpts).run();
  }

  async number(opts: NumberOpts): Promise<Result> {
    this.parseOptions(opts);
    return new Number(this.opts as NumberOpts).run();
  }

  async confirm(opts: ConfirmOpts): Promise<Result> {
    this.parseOptions(opts);
    return new Confirm(this.opts as ConfirmOpts).run();
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
