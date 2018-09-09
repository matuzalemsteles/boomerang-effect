# API

To cause the boomerang effect it is necessary to `emit` events from the `renderer` to the closest `provider`, with this we provide `Provider` and `connect` so that the communication can be done from end to end without having to happen a propagation of events.

> Before proceeding with implementation, make sure you [read the architecture concepts](concepts.md) so you can move forward and get the most out of Boomerang.

## Table of Contents

* [Provider](#contributing)
  + [`connect`](#license)

## Provider

```js
const events = {
  clicked: () => {},
};

<Boomerang.Provider events={events}>
  {children}
</Boomerang.Provider>
```

A `provider` receives the `events` that he wishes to hear from his children`s.

### `connect`

```js
connect(
  Component: MetalClass | MetalFunctionalComponent
): HigherOrderComponent
```

`Connect` is a **higher-order component** (HOC) that connects the component to the providers, it passes the `events` written in `context` which are registered from `<Boomerang.Provider />`.