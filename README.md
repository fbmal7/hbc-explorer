![Compiler Explorer](views/resources/site-logo.svg)

# Compiler Explorer

**Compiler Explorer** is an interactive compiler exploration website. Edit code in C, C++, C#, F#, Rust, Go, D, Haskell,
Swift, Pascal, [ispc](https://ispc.github.io/), Python, Java or in any of the other
[30+ supported languages](https://godbolt.org/api/languages), and see how that code looks after being compiled in real
time. Multiple compilers are supported for each language, many different tools and visualisations are available, and the
UI layout is configurable.

## Using Compiler Explorer

Assuming you have a compatible version of `node` installed, on Linux simply running `make` ought to get you up and
running with an Explorer running on port 10240 on your local machine:
[http://localhost:10240/](http://localhost:10240/). Currently, **Compiler Explorer** requires
[`node` 16 _(LTS version)_](CONTRIBUTING.md#node-version) installed, either on the path or at `NODE_DIR` (an environment
variable or `make` parameter), and will soon be moving to v18.

Running with `make EXTRA_ARGS='--language LANG'` will allow you to load `hermes` exclusively. If you want to use other
languages locally, you may run `make` without any arguments.

For development, we suggest using `make dev` to enable some useful features, such as automatic reloading on file changes
and shorter startup times. You can also use `npm run dev` to run if `make dev` doesn't work on your machine.

## Using Hermes

Compiler Explorer will look for a `hermes` executable on your system `$PATH`. This means you must add the build
directory for hermes to your path. In the case of a CMake build, it could be something like this in your `.zshrc`:

```
# add release hermes to the path
export PATH=$PATH:~/builds/release/bin
```

A typical use-case for using compiler explorer is to A/B a local version of the hermes compiler against main. To support
this workflow, compiler explorer will also try to look for an executable `hermes-base`. It's easiest to just rename the
hermes executable produced during a typical build to `hermes-base`. Then both `hermes` and `hermes-base` will be
side-by-side in the same build directory, and you can point the `$PATH` there.

## Sample `CMake` workflow

### Setup

- `git clone https://github.com/fbmal7/hbc-explorer.git`
- `cd hbc-explorer`
- `make EXTRA_ARGS='--language hermes'` - note this will also start the server.

### Running

- Start from a checkout of a stable commit
- `cd ~/builds/release`
- `ninja && cp bin/hermes bin/hermes-base`
- Checkout your experimental diff
- Rebuild hermes, `ninja`
- Run `npm run dev`
- Select Templates --> Diff Two Compilers

Note that every time you rebuild Hermes you must re-run `npm run dev` in order to load in the new executable.
