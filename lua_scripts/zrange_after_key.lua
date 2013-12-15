-- do zrange with after_key as start param
-- i.e. do a zrange query and set result as param to zrange
local set = KEYS[1]
local after_id = KEYS[2]

local start = redis.call('zrank', set, after_id) + 1
local stop = -1
local results = redis.call('zrange', set, start, stop)

return results