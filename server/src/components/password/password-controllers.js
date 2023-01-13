import generator from 'generate-password';
import zxcvbn from 'zxcvbn';

export async function create (ctx) {
  try {
    let options = {};

    if (ctx.request.body.length !== undefined && ctx.request.body.length !== '')
      options.length = ctx.request.body.length;

    if (ctx.request.body.multiple !== undefined && ctx.request.body.multiple !== []) {
      for (let i = 0; i < ctx.request.body.multiple.length; i++) {
        switch (ctx.request.body.multiple[i]) {
          case ('Include uppercase letters') :
            options.uppercase = true;
            break;
          case ('Include lowercase letters') :
            options.lowercase = true;
            break;
          case ('Include numbers') :
            options.numbers = true;
            break;
          case ('Include symbols') :
            options.symbols = true;
            break;
        }
      }
      if (ctx.request.body.multiple.length === 4 && ctx.request.body.length >= 4) options.strict = true;
    }
    const password = generator.generate(options);
    ctx.ok(zxcvbn(password));
  } catch (e) {
    ctx.badRequest({ message: e.message });
  }
}

// export async function create (ctx) {
//   try {
//     const TaskValidationSchema = Joi.object({
//       title: Joi.string().required(),
//       list: Joi.string().required(),
//       description: Joi.string()
//     })
//     const { error, value } = TaskValidationSchema.validate(ctx.request.body)
//     if(error) throw new Error(error)
//     const task = await Task.create(value)
//     ctx.ok(task)
//   } catch (e) {
//     ctx.badRequest({ message: e.message })
//   }
// }
