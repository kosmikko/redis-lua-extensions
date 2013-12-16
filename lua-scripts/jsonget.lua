-- get value stored in JSON blob
-- params: 1 redis_key name_to_read_value_from
if redis.call("EXISTS", KEYS[1]) == 1 then
  local payload = redis.call("GET", KEYS[1])
  return cjson.decode(payload)[ARGV[1]]
else
  return nil
end