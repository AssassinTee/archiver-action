const core = require('@actions/core');
const github = require('@actions/github');

const jszip = require('jszip');
const tar = require('tar');
const SevenZ = require('node-7z-forall');
const FileSaver = require('file-saver');

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
			zip = new jszip();
            zip.file(`${files}`);
            zip
				.generateNodeStream({type:'nodebuffer',streamFiles:true})
				.pipe(fs.createWriteStream(`${outputname}`))
				.on('finish', function () {
					// JSZip generates a readable stream with a "end" event,
					// but is piped here in a writable stream which emits a "finish" event.
					console.log(`${outputname} has been zipped`);
				});
            break;
        case "7z":
            const Seven = new SevenZ();
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