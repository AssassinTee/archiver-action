import JSZip from 'jszip';
import 'tar';
import Seven from 'node-7z';

const core = require('@actions/core');
const github = require('@actions/github');

try {
    const archiver = core.getInput('archiver');
    const outputname = core.getInput('name');
    const files = core.getInput('files');

    console.log(`Archiver: ${archiver}`);
    console.log(`Output name: ${outputname}`);
    console.log(`Files: ${files}`);

    //const time = (new Date()).toTimeString();
    //core.setOutput("time", time);

    switch (archiver) {
        case "zip":
            var zip = new JSZip();
            zip.file(files);
            zip.generateAsync({type:"blob"})
                .then(function(content) {
                    // see FileSaver.js
                    saveAs(content, outputname);
                });
            break;
        case "7z":
            const stream = Seven.add(outputname, files, {
                recursive: true
            });
            console.log(stream.info);
            break;
        case "tar":
            tar.c(
                {
                    gzip: true,
                    file: 'my-tarball.tgz'
                },
                ['some', 'files', 'and', 'folders']
            ).then(_ => {});
            break;
        default:
            console.log(`Archiver ${archiver} currently not supported!`);
            core.setFailed(`Archiver ${archiver} currently not supported!`);
    }

    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2);
    console.log(`The event payload: ${payload}`);
} catch (error) {
    core.setFailed(error.message);
}