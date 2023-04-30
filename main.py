import os
import re
from tqdm import tqdm
import shutil

def parse_layout(file_name, output_dir):
    with open(file_name, 'r', encoding='utf-8') as f:
        content = f.read()

    layout_tag_re = r'<layout\s+([\w\u4e00-\u9fa5]+)\s+(.*?)\s*>'

    parsed_content = ''
    start_pos = 0

    for match in re.finditer(layout_tag_re, content):
        #print(filename)
        file_name = match.group(2)
        aaa = match.group(1)
        #print(file_name)
        #print(aaa)

        # process content before the layout tag
        parsed_content += content[start_pos:match.start()]
        #print(parsed_content)
        # process the layout tag
        parsed_content += layout(file_name, output_dir, aaa)

        # update start position to after the layout tag
        start_pos = match.end()

    # process content after the last layout tag
    parsed_content += content[start_pos:]
    output(filename,parsed_content)
    return 


def layout(file_name, output_dir, aaa):
    file_path = ''
    if aaa == 'ejs':
        file_path = os.path.join('layout', f"{file_name}.ejs")
    elif aaa == 'html':
        file_path = os.path.join('layout','html', f"{file_name}.html")
    else:
        raise ValueError(f'Invalid layout type: {aaa}')
    #print(file_path)
    #print(aaa)
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    return content

def output(filename,content):
    file_name = 'index.html'
    if filename == 'index.ejs':
        output_dir = os.path.join('dist')
    elif filename == '404.ejs':
        output_dir = os.path.join('dist')
    else:
        output_dir = os.path.join('dist',os.path.splitext(filename)[0])
    output_file_path = os.path.join(output_dir, file_name)
    os.makedirs(output_dir, exist_ok=True)
    with open(output_file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    return

if __name__ == '__main__':
    if os.path.exists('./dist'):
        shutil.rmtree('./dist')
    shutil.copytree('./asstes', './dist')
    layout_dir = 'layout'
    for dirpath, dirnames, filenames in os.walk(layout_dir):
        for filename in tqdm(filenames, desc='Processing layout files'):
            if filename.endswith('.ejs'):
                file_path = os.path.join(dirpath, filename)
                output_dir = os.path.join('dist', os.path.relpath(dirpath, layout_dir))
                parse_layout(file_path, output_dir)
