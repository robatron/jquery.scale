#! /usr/bin/env python
'''
"Compile" jquery.scale

Compiles jquery.scale.js utilizing Google's Closure Tools 
(http://code.google.com/closure). Script based on one found in the tutorial
(http://code.google.com/closure/compiler/docs/api-tutorial1.html)

By Rob McGuire-Dale, Feb. 2011
'''

import httplib, urllib, sys

# ----------
# "settings"
# ----------
IN = 'jquery.scale.js'
OUT = 'jquery.scale.min.js'
COMPILATION_LEVEL = 'SIMPLE_OPTIMIZATIONS'

# ---------
# start up
# ---------
print "---------------------------"
print " Compiling jquery.scale..."
print "---------------------------"
print "Compiling '%s' to '%s'..."%(IN, OUT)
print "Compilation level: %s"%COMPILATION_LEVEL

# --------
# read in
# --------
f = open(IN, 'r')
source = f.read()
f.close()

# ----------
# "compile"
# ----------
# encode http POST parameters
params = urllib.urlencode([
    ('js_code', source),
    ('compilation_level', COMPILATION_LEVEL),
    ('output_format', 'text'),
    ('output_info', 'compiled_code'),
])

# Always use the following value for the Content-type header.
headers = { "Content-type": "application/x-www-form-urlencoded" }

# open a connection to closure tool
print "Connecting to Closure Tools..."
conn = httplib.HTTPConnection('closure-compiler.appspot.com')

# make the POST request
conn.request('POST', '/compile', params, headers)

# collect the response 
response = conn.getresponse()
print "HTTP response: %s %s"%(response.status, response.reason)

# collect compiled code
data = response.read()

# close up the connection
print "Closing connection..."
conn.close

# ----------
# write out
# ----------
f = open(OUT, 'w')
f.write(data)
f.close

# ----------
# finish up
# ----------
print "Compiled source from %d chars --> %d chars (reduced by %.2f%%)"%\
        (len(source), len(data), float(len(data))/float(len(source))*100)
print "Finished!"

