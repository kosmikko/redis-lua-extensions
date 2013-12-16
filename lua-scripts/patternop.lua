-- apply operator to matching keys
-- params:
--  pattern ARGV[1]
--  operator ARGV[2]
-- e.g.
-- redis-cli eval "$(cat lua_scripts/pattern_op.lua)" 0 foo* del
return redis.call(ARGV[2], unpack(redis.call('keys', ARGV[1])))