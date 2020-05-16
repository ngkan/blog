"""
Convert a HTML / CSS / of files to a string and replacing
newline characters ('\n') with backslash ('\').
Also add \\ to '.
"""

print('Name of the file:')

file_name = str(input())

with open(file_name, 'r') as file:
    data = file.read() #.replace('\n', '\\')
    out = ''
    for c in data:
        if c == '\n':
            out += '\\\n'
        elif c == '\'':
            out += '\\\''
        else:
            out += c
    
    with open(file_name + '.js', 'w') as output:
        output.write('\'' + out + '\'')
