#!/bin/bash
 if [ ! -z ${API_URL} ]; then
 cat <<END
window.RUNTIME_API_URL='${API_URL}';
END
fi