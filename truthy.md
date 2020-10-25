## Truthy
**Description:** Tests whether the specified value coerces to `true`

**Examples:**
``` diff
+ isTruthy(true)
- isTruthy(false)
+ isTruthy(new Boolean(true))
+ isTruthy(1)
+ isTruthy('1')
```

