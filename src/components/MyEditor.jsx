import '@wangeditor/editor/dist/css/style.css' // 引入 css

import { useState, useEffect, } from 'react'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'


// eslint-disable-next-line react/display-name
const MyEditor = () => {
    const [editor, setEditor] = useState(null) // 存储 editor 实例
    const [html, setHtml] = useState('') // 编辑器内容

    const toolbarConfig = {}
    const editorConfig = {
        placeholder: '请输入内容...',
    }

    // 及时销毁 editor ，重要！
    useEffect(() => {
        return () => {
            if (editor == null) return
            editor.destroy()
            setEditor(null)
        }
    }, [editor])

    return (
        <>
            <div style={{ border: '1px solid #ccc', zIndex: 100 }}>
                <Toolbar
                    editor={editor}
                    defaultConfig={toolbarConfig}
                    mode="default"
                    style={{ borderBottom: '1px solid #ccc' }}
                />
                <Editor
                    defaultConfig={editorConfig}
                    value={html}
                    onCreated={setEditor}
                    onChange={editor => setHtml(editor.getHtml())}
                    mode="default"
                    style={{ height: '500px', 'overflowY': 'hidden' }}
                />
            </div>
            <div style={{ marginTop: '15px' }}>
                {html}
            </div>
        </>
    )
}


export default MyEditor