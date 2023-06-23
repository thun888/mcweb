import subprocess
import threading

def stop_server(process):
    # 监听键盘输入
    input("按下回车键停止服务器...")
    # 终止子进程
    process.terminate()

while True:
    # 执行第一次流程
    print("刷新~")
    # 生成静态文件
    subprocess.run(["python", "./main.py"])
    
    # 启动HTTP服务器
    server_process = subprocess.Popen(["python", "-m", "http.server", "8000", "-d", "./dist"])

    # 监听键盘输入的线程
    stop_thread = threading.Thread(target=stop_server, args=(server_process,))
    stop_thread.start()

    # 等待子进程结束
    server_process.wait()

    # 结束键盘输入监听线程
    stop_thread.join()
