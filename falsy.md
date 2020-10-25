## Falsy
**Description:** Tests whether the specified value value coerces to `false`

**Examples:**
``` diff
- isFalsy(true)
+ isFalsy(false)
- isFalsy(new Boolean(false))
+ isFalsy(0)
+ isFalsy(null)
+ isFalsy(undefined)
- isFalsy('0')
```

