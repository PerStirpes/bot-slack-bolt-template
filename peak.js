const TCLmessage = {
  client_msg_id: 'df0ca064-8fa4-4810-bfe3-cb66292e8c66',
  type: 'message',
  text: ':red_circle:',
  user: 'UMPLZD0H5',
  ts: '1569361995.001300',
  team: 'TMQ0YBZHC',
  channel: 'CMRFF2NUE',
  event_ts: '1569361995.001300',
  channel_type: 'channel',
};

const _event = {
  context: {
    botToken: 'xoxb-738032407590-757870435427-OrbFTUxl5jKXhjrkE8Vb8OCq',
    botId: 'BNP5WM5LP',
    botUserId: 'UN9RLCTCK',
    updateConversation: '[Function]',
  },
  next: '[Function: noop]',
  body: {
    type: 'block_actions',
    team: { id: 'TMQ0YBZHC', domain: 'dev-launchdarkly' },
    user: {
      id: 'UMPLZD0H5',
      username: 'matt',
      name: 'matt',
      team_id: 'TMQ0YBZHC',
    },
    api_app_id: 'ANPG45QKY',
    token: 'ABrHq0HKRQ5FZqdm6Jd5ixms',
    container: {
      type: 'message',
      message_ts: '1569361996.001400',
      channel_id: 'CMRFF2NUE',
      is_ephemeral: false,
    },
    trigger_id: '760557708003.738032407590.5302f8b2c858582ee63b38359669e860',
    channel: { id: 'CMRFF2NUE', name: 'g' },
    message: {
      type: 'message',
      subtype: 'bot_message',
      text: 'HELla YES',
      ts: '1569361996.001400',
      username: 'bolt-app',
      bot_id: 'BNP5WM5LP',
      blocks: [Array],
    },
    response_url: 'https://hooks.slack.com/actions/TMQ0YBZHC/765612432497/0Yz3YWmeRlZspfamArhTyOXi',
    actions: '[[Object]]',
  },
  payload: {
    action_id: 'escalate_yes',
    block_id: 'KHSh',
    text: { type: 'plain_text', text: 'HELL YES', emoji: true },
    value: '{"ts":"1569361995.001300","channel":"CMRFF2NUE","user":"UMPLZD0H5"}',
    type: 'button',
    action_ts: '1569362110.749571',
  },
  action: {
    action_id: 'escalate_yes',
    block_id: 'KHSh',
    text: { type: 'plain_text', text: 'HELL YES', emoji: true },
    value: '{"ts":"1569361995.001300","channel":"CMRFF2NUE","user":"UMPLZD0H5"}',
    type: 'button',
    action_ts: '1569362110.749571',
  },
  say: '[Function]',
  respond: '[Function]',
  ack: '[Function: ack]',
};

export interface MemberJoinedChannelEvent extends StringIndexed {
  type: 'member_joined_channel';
  user: string;
  channel: string;
  channel_type: string;
  team: string;
  inviter?: string;
}

{
  "compilerOptions": {
    /* Basic Options */
    "target": "es5",                          /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019' or 'ESNEXT'. */
    "module": "commonjs",                     /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', or 'ESNext'. */
    // "lib": [],                             /* Specify library files to be included in the compilation. */
    // "allowJs": true,                       /* Allow javascript files to be compiled. */
    // "checkJs": true,                       /* Report errors in .js files. */
    // "jsx": "preserve",                     /* Specify JSX code generation: 'preserve', 'react-native', or 'react'. */
    // "declaration": true,                   /* Generates corresponding '.d.ts' file. */
    // "declarationMap": true,                /* Generates a sourcemap for each corresponding '.d.ts' file. */
    // "sourceMap": true,                     /* Generates corresponding '.map' file. */
    // "outFile": "./",                       /* Concatenate and emit output to single file. */
    // "outDir": "./",                        /* Redirect output structure to the directory. */
    // "rootDir": "./",                       /* Specify the root directory of input files. Use to control the output directory structure with --outDir. */
    // "composite": true,                     /* Enable project compilation */
    // "incremental": true,                   /* Enable incremental compilation */
    // "tsBuildInfoFile": "./",               /* Specify file to store incremental compilation information */
    // "removeComments": true,                /* Do not emit comments to output. */
    // "noEmit": true,                        /* Do not emit outputs. */
    // "importHelpers": true,                 /* Import emit helpers from 'tslib'. */
    // "downlevelIteration": true,            /* Provide full support for iterables in 'for-of', spread, and destructuring when targeting 'ES5' or 'ES3'. */
    // "isolatedModules": true,               /* Transpile each file as a separate module (similar to 'ts.transpileModule'). */

    /* Strict Type-Checking Options */
    "strict": true,                           /* Enable all strict type-checking options. */
    // "noImplicitAny": true,                 /* Raise error on expressions and declarations with an implied 'any' type. */
    // "strictNullChecks": true,              /* Enable strict null checks. */
    // "strictFunctionTypes": true,           /* Enable strict checking of function types. */
    // "strictBindCallApply": true,           /* Enable strict 'bind', 'call', and 'apply' methods on functions. */
    // "strictPropertyInitialization": true,  /* Enable strict checking of property initialization in classes. */
    // "noImplicitThis": true,                /* Raise error on 'this' expressions with an implied 'any' type. */
    // "alwaysStrict": true,                  /* Parse in strict mode and emit "use strict" for each source file. */

    /* Additional Checks */
    // "noUnusedLocals": true,                /* Report errors on unused locals. */
    // "noUnusedParameters": true,            /* Report errors on unused parameters. */
    // "noImplicitReturns": true,             /* Report error when not all code paths in function return a value. */
    // "noFallthroughCasesInSwitch": true,    /* Report errors for fallthrough cases in switch statement. */

    /* Module Resolution Options */
    // "moduleResolution": "node",            /* Specify module resolution strategy: 'node' (Node.js) or 'classic' (TypeScript pre-1.6). */
    // "baseUrl": "./",                       /* Base directory to resolve non-absolute module names. */
    // "paths": {},                           /* A series of entries which re-map imports to lookup locations relative to the 'baseUrl'. */
    // "rootDirs": [],                        /* List of root folders whose combined content represents the structure of the project at runtime. */
    // "typeRoots": [],                       /* List of folders to include type definitions from. */
    // "types": [],                           /* Type declaration files to be included in compilation. */
    // "allowSyntheticDefaultImports": true,  /* Allow default imports from modules with no default export. This does not affect code emit, just typechecking. */
    "esModuleInterop": true                   /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */
    // "preserveSymlinks": true,              /* Do not resolve the real path of symlinks. */

    /* Source Map Options */
    // "sourceRoot": "",                      /* Specify the location where debugger should locate TypeScript files instead of source locations. */
    // "mapRoot": "",                         /* Specify the location where debugger should locate map files instead of generated locations. */
    // "inlineSourceMap": true,               /* Emit a single file with source maps instead of having a separate file. */
    // "inlineSources": true,                 /* Emit the source alongside the sourcemaps within a single file; requires '--inlineSourceMap' or '--sourceMap' to be set. */

    /* Experimental Options */
    // "experimentalDecorators": true,        /* Enables experimental support for ES7 decorators. */
    // "emitDecoratorMetadata": true,         /* Enables experimental support for emitting type metadata for decorators. */
  }
}